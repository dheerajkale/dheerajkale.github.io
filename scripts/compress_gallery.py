#!/usr/bin/env python3
"""Compress the gallery assets so they load quickly on the website.

The gallery (``src/pages/Gallery.tsx``) renders images and PDFs found under
``src/assets/gallery``. Those files are often exported straight from design
tools or messaging apps and can be many megabytes each. This script shrinks
them in place while keeping the same filename and extension, so the gallery
config keeps resolving them without any code changes.

Images
    Downscaled so the longest edge is at most ``--max-dim`` and re-encoded at
    ``--quality``. Uses Pillow when installed, otherwise falls back to
    ImageMagick.

PDFs
    Rewritten with Ghostscript using the ``--pdf-preset`` quality profile.

Media (optional, ``--media``)
    Videos are transcoded with ffmpeg to H.264 MP4 and audio is transcoded to
    AAC ``.m4a``. These files are not referenced by the gallery, so this is
    off by default.

A file is only replaced when the compressed version is genuinely smaller.
Run without ``--apply`` first to see what would happen.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
PDF_EXTS = {".pdf"}
VIDEO_EXTS = {".mp4", ".mov", ".mkv", ".webm", ".avi", ".mpg", ".mpeg", ".wmv"}
AUDIO_EXTS = {".wav", ".mp3", ".m4a", ".aac", ".flac", ".ogg"}
SKIP_DIRS = {"__pycache__", ".git"}

DEFAULT_ROOT = Path(__file__).resolve().parent.parent / "src" / "assets" / "gallery"


def human(num_bytes: int) -> str:
    size = float(num_bytes)
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024 or unit == "GB":
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} GB"


def which(*names: str) -> str | None:
    for name in names:
        found = shutil.which(name)
        if found:
            return found
    return None


def pillow_available() -> bool:
    try:
        import PIL.Image  # noqa: F401

        return True
    except ImportError:
        return False


def image_escape(path: Path) -> Path | None:
    """Return a compressed temp copy of an image, or None on failure."""
    suffix = path.suffix
    fd, tmp_name = tempfile.mkstemp(suffix=suffix, dir=path.parent)
    Path(tmp_name).unlink()
    tmp = Path(tmp_name)

    if pillow_available():
        ok = _compress_image_pillow(path, tmp, suffix)
    else:
        ok = _compress_image_imagemagick(path, tmp)

    if not ok:
        tmp.unlink(missing_ok=True)
        return None
    return tmp


def _compress_image_pillow(src: Path, dst: Path, suffix: str) -> bool:
    try:
        from PIL import Image, ImageOps
    except ImportError:
        return False

    try:
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im)
            if ARGS.max_dim and max(im.size) > ARGS.max_dim:
                im.thumbnail((ARGS.max_dim, ARGS.max_dim), Image.LANCZOS)

            save_kwargs: dict = {"optimize": True}
            if suffix in {".jpg", ".jpeg"}:
                if im.mode not in ("RGB", "L"):
                    im = im.convert("RGB")
                save_kwargs.update(quality=ARGS.quality, progressive=True, subsampling=2)
            elif suffix == ".png":
                if im.mode not in ("RGB", "RGBA", "L", "P"):
                    im = im.convert("RGBA")
            elif suffix == ".webp":
                save_kwargs.update(quality=ARGS.quality, method=6)

            im.save(dst, **save_kwargs)
        return True
    except Exception as exc:  # pragma: no cover - best effort
        print(f"    ! Pillow failed for {src.name}: {exc}", file=sys.stderr)
        return False


def _compress_image_imagemagick(src: Path, dst: Path) -> bool:
    magick = which("magick", "convert")
    if not magick:
        print(
            f"    ! need Pillow (`pip install Pillow`) or ImageMagick to compress {src.name}",
            file=sys.stderr,
        )
        return False

    cmd = [magick, str(src), "-auto-orient"]
    if ARGS.max_dim:
        cmd += ["-resize", f"{ARGS.max_dim}x{ARGS.max_dim}>"]
    cmd += ["-strip", "-quality", str(ARGS.quality), str(dst)]
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as exc:
        print(f"    ! ImageMagick failed for {src.name}: {exc.stderr.decode(errors='ignore')}")
        return False


def pdf_escape(path: Path) -> Path | None:
    gs = which("gs", "gswin64c", "gswin32c")
    if not gs:
        print(f"    ! Ghostscript (`gs`) not found, skipping {path.name}", file=sys.stderr)
        return None

    fd, tmp_name = tempfile.mkstemp(suffix=".pdf", dir=path.parent)
    Path(tmp_name).unlink()
    tmp = Path(tmp_name)

    cmd = [
        gs,
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.5",
        f"-dPDFSETTINGS=/{ARGS.pdf_preset}",
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        "-dDetectDuplicateImages=true",
        "-dCompressFonts=true",
        "-dSubsetFonts=true",
        f"-sOutputFile={tmp}",
        str(path),
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True)
    except subprocess.CalledProcessError as exc:
        print(f"    ! Ghostscript failed for {path.name}: {exc.stderr.decode(errors='ignore')}")
        tmp.unlink(missing_ok=True)
        return None
    return tmp


def media_escape(path: Path) -> Path | None:
    ffmpeg = which("ffmpeg")
    if not ffmpeg:
        print(f"    ! ffmpeg not found, skipping {path.name}", file=sys.stderr)
        return None

    suffix = path.suffix.lower()
    video = suffix in VIDEO_EXTS
    out_suffix = ".mp4" if video else ".m4a"

    fd, tmp_name = tempfile.mkstemp(suffix=out_suffix, dir=path.parent)
    Path(tmp_name).unlink()
    tmp = Path(tmp_name)

    cmd = [ffmpeg, "-y", "-i", str(path)]
    if video:
        cmd += [
            "-c:v",
            "libx264",
            "-crf",
            str(ARGS.video_crf),
            "-preset",
            "slow",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
        ]
    else:
        cmd += ["-c:a", "aac", "-b:a", "128k"]
    cmd += [str(tmp)]

    try:
        subprocess.run(cmd, check=True, capture_output=True)
    except subprocess.CalledProcessError as exc:
        print(f"    ! ffmpeg failed for {path.name}: {exc.stderr.decode(errors='ignore')[-400:]}")
        tmp.unlink(missing_ok=True)
        return None
    return tmp


def backup(path: Path, backup_root: Path, root: Path) -> None:
    target = backup_root / path.relative_to(root)
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, target)


def process(path: Path, root: Path, stats: dict) -> None:
    suffix = path.suffix.lower()
    original = path.stat().st_size

    if suffix in IMAGE_EXTS:
        kind, tmp = "image", image_escape(path)
    elif suffix in PDF_EXTS:
        kind, tmp = "pdf", pdf_escape(path)
    elif ARGS.media and (suffix in VIDEO_EXTS or suffix in AUDIO_EXTS):
        kind, tmp = "media", media_escape(path)
    else:
        return

    if tmp is None:
        return

    new_size = tmp.stat().st_size
    if new_size >= original:
        tmp.unlink(missing_ok=True)
        print(f"  = {path.relative_to(root)}  ({human(original)} already optimal)")
        stats[kind]["skipped"] += 1
        return

    saved = original - new_size
    pct = saved / original * 100
    print(
        f"  - {path.relative_to(root)}  {human(original)} -> {human(new_size)} "
        f"({pct:.0f}% smaller)"
    )
    stats[kind]["count"] += 1
    stats[kind]["saved"] += saved

    if not ARGS.apply:
        tmp.unlink(missing_ok=True)
        return

    if ARGS.backup:
        backup(path, ARGS.backup, root)

    new_path = path.with_suffix(tmp.suffix if kind == "media" else path.suffix)
    shutil.move(str(tmp), str(new_path))
    if kind == "media" and new_path != path:
        path.unlink(missing_ok=True)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Compress the gallery assets in place.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT, help="gallery asset root")
    parser.add_argument("--apply", action="store_true", help="actually rewrite files (default: dry run)")
    parser.add_argument("--backup", type=Path, help="copy originals into this directory before rewriting")
    parser.add_argument("--max-dim", type=int, default=2400, help="max longest edge for images")
    parser.add_argument("--quality", type=int, default=82, help="JPEG/WebP quality (1-100)")
    parser.add_argument(
        "--pdf-preset",
        choices=["screen", "ebook", "printer", "prepress"],
        default="ebook",
        help="Ghostscript PDF quality profile",
    )
    parser.add_argument("--media", action="store_true", help="also transcode videos/audio (not used by the gallery)")
    parser.add_argument("--video-crf", type=int, default=28, help="H.264 quality for --media (lower = better)")

    global ARGS
    ARGS = parser.parse_args()

    root: Path = ARGS.root
    if not root.is_dir():
        print(f"error: gallery root not found: {root}", file=sys.stderr)
        return 1

    print(f"Gallery root: {root}")
    print(f"Mode: {'APPLY' if ARGS.apply else 'DRY RUN (pass --apply to write)'}")
    print(f"Images <= {ARGS.max_dim}px, quality {ARGS.quality}; PDF preset '{ARGS.pdf_preset}'")
    print()

    stats = {"image": {"count": 0, "saved": 0, "skipped": 0},
             "pdf": {"count": 0, "saved": 0, "skipped": 0},
             "media": {"count": 0, "saved": 0, "skipped": 0}}

    files = sorted(
        p
        for p in root.rglob("*")
        if p.is_file() and not any(part in SKIP_DIRS for part in p.parts)
    )

    for path in files:
        process(path, root, stats)

    total_saved = sum(s["saved"] for s in stats.values())
    total_count = sum(s["count"] for s in stats.values())
    print()
    print(f"Compressed {total_count} file(s), saved {human(total_saved)}.")
    if not ARGS.apply:
        print("Dry run only. Re-run with --apply to rewrite the files.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
