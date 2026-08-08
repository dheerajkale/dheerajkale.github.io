import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy, PDFPageProxy, PageViewport } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Document } from '../../types/gallery';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

function PdfPage({
    pdf,
    pageNumber,
}: {
    pdf: PDFDocumentProxy;
    pageNumber: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [page, setPage] = useState<PDFPageProxy | null>(null);
    const [viewport, setViewport] = useState<PageViewport | null>(null);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        let cancelled = false;
        pdf.getPage(pageNumber)
            .then((p) => {
                if (!cancelled) setPage(p);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [pdf, pageNumber]);

    useEffect(() => {
        if (!page) return;
        const container = containerRef.current;
        if (!container) return;

        const baseViewport = page.getViewport({ scale: 1 });

        const update = () => {
            const width = container.clientWidth;
            if (!width) return;
            const scale = width / baseViewport.width;
            const vp = page.getViewport({ scale });
            setViewport((prev) =>
                prev &&
                Math.abs(prev.width - vp.width) < 1 &&
                Math.abs(prev.height - vp.height) < 1
                    ? prev
                    : vp,
            );
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(container);
        return () => observer.disconnect();
    }, [page]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !page || !viewport) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderTask = page.render({ canvas, viewport });
        let settled = false;
        renderTask.promise
            .then(() => {
                if (settled) return;
                settled = true;
                setRendered(true);
            })
            .catch(() => {});

        return () => {
            settled = true;
            renderTask.cancel();
        };
    }, [page, viewport]);

    if (!viewport) return <div ref={containerRef} className="w-full" />;

    return (
        <div ref={containerRef} className="w-full">
            <div
                className="relative mx-auto w-full overflow-hidden rounded-sm bg-white shadow-lg"
                style={{ aspectRatio: `${viewport.width} / ${viewport.height}` }}
            >
                {!rendered && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin text-black/30" strokeWidth={1.5} />
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
                        rendered ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white/85">
                    {pageNumber} / {pdf.numPages}
                </span>
            </div>
        </div>
    );
}

export function PdfPagesViewer({ document }: { document: Document }) {
    const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let disposed = false;
        const loadingTask = pdfjsLib.getDocument({ url: document.src });

        setPdf(null);
        setError(null);

        loadingTask.promise
            .then((doc) => {
                if (disposed) {
                    loadingTask.destroy();
                    return;
                }
                setPdf(doc);
            })
            .catch((err: unknown) => {
                if (!disposed) {
                    setError(err instanceof Error ? err.message : 'Failed to load PDF.');
                }
            });

        return () => {
            disposed = true;
            loadingTask.destroy();
        };
    }, [document.src]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                <p className="text-white/55">Couldn&apos;t render this PDF inline.</p>
                <a
                    href={document.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                >
                    Open PDF in new tab
                    <ArrowUpRight className="h-4 w-4" />
                </a>
            </div>
        );
    }

    if (!pdf) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-white/40" strokeWidth={1.25} />
                <p className="text-sm text-white/40">Loading PDF…</p>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center gap-5">
            {Array.from({ length: pdf.numPages }, (_, i) => i + 1).map((num) => (
                <PdfPage key={num} pdf={pdf} pageNumber={num} />
            ))}
        </div>
    );
}
