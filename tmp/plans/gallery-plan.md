# Gallery Page — Design Plan

## Overview

A full-page carousel gallery page with sections containing document assets. Users browse sections via prev/next navigation and can open individual documents in an overlay to view them with optional descriptions.

## Architecture

### Tech Stack (matches existing site)
- React 19.2.8 (Vite 8.2.0, no Next.js)
- Tailwind CSS v4.3.3
- TypeScript with strict mode
- No external routing or state management

### File Structure
```
src/
├── types/
│   └── gallery.ts          # Document + GallerySection interfaces
└── pages/
    └── Gallery.tsx          # Main component
```

## Data Model

### File Structure (future)
```
src/assets/
├── gallery/
│   ├── projects/
│   │   ├── project1.jpg
│   │   ├── project1.md
│   │   ├── project2.png
│   │   ├── project2.md
│   │   ├── project-report.pdf
│   │   └── project-report.md
│   ├── samples/
│   │   ├── sample1.jpg
│   │   ├── sample1.md
│   │   ├── sample-doc.pdf
│   │   └── sample-doc.md
│   └── portfolio/
│       ├── portfolio1.jpg
│       └── portfolio1.md
```

### `Document` interface
```typescript
interface Document {
  src: string;          // e.g. project1.jpg
  type: DocumentType;   // 'image' for photos, 'pdf' for PDFs
  description?: string; // read from <file>.md
}
```

### `GallerySection` interface
```typescript
interface GallerySection {
  title: string;        // derived from directory name or config
  path: string;         // e.g. gallery/projects
  documents: Document[]; // derived from files in directory
}
```

### Config Object (future)
```typescript
interface GalleryConfig {
  sections: GallerySection[];
}
```

### Example config (future)
```typescript
const config: GalleryConfig = {
  sections: [
    {
      title: 'Projects',
      path: 'gallery/projects',
      documents: [
        { src: 'project1.jpg', type: 'image' },
        { src: 'project2.png', type: 'image' },
      ],
    },
    {
      title: 'Work Samples',
      path: 'gallery/samples',
      documents: [
        { src: 'sample1.jpg', type: 'image' },
      ],
    },
  ],
};
```

## Component Behavior

### Carousel Navigation (Section Level)
- **Prev/Next buttons** — cycle through gallery sections
- **Dot indicators** — show active section, clickable to jump
- **Section count** — total number of sections visible
- **Auto-advance** — when no document is open, cycle through documents in the active section every **5–6 seconds**

### Document Display (Grid)
- **Layout** — 2-column grid: document image on left, description on right
- **Image sizing** — `max-h-40` (16rem), `object-contain`
- **PDF preview** — thumbnail/first-page preview with PDF icon
- **Description column** — right column shows description in muted text
- **Auto-cycle** — when viewer is closed, documents in the active section advance automatically (5–6s per document)

### Auto-Cycle Controls
- **Section-level button** — toggle auto-advance on/off for the active section
- **Off state** — no auto-cycle, user manually clicks prev/next
- **On state** — documents cycle every 5–6s in the active section
- **Viewer is independent** — auto-cycle does NOT apply while the document viewer is open

### Document Viewer (Overlay)
- **Trigger** — click any document to open
- **Overlay** — full-screen dark backdrop (`bg-black/70`)
- **Layout** — 2-column: document (left, full-size) + description (right)
- **Close** — click backdrop or × button
- **Max height** — `90vh` with scroll
- **PDF viewer** — inline `<iframe>` or `<embed>` for PDFs
- **Auto-cycle off** — no auto-cycle while viewer is open (must use separate toggle button)
- **Description persists** — description stays visible in the right column while cycling

## Styling

### Color scheme
- Background: white
- Text: black
- Active section: `bg-black/5` border
- Inactive sections: `border-gray-300`
- Overlays: `bg-black/70`

### Layout
- `min-h-screen w-screen` (full viewport)
- `max-w-9/12` for content width
- `py-12` for vertical padding
- Centered content with `items-center justify-center`

### Interactions
- Buttons: `hover:bg-black hover:text-white` with transition
- Dot indicators: active = black, inactive = `bg-gray-300`
- Overlay: `z-50` for stacking

## Implementation Notes (Future)

1. **Read from disk** — `fs/promises` to read `src/assets/gallery/*/` directory
2. **Parse markdown** — read `<file>.md` for descriptions, strip frontmatter
3. **Classify files** — split into `image/` and `pdf/` subdirectories
4. **Build config** — convert filesystem structure into `GalleryConfig`
5. **Mount config** — pass to component as props instead of hardcoded data
6. **No React Router** — page is a sibling component in App.tsx
7. **No CSS Modules** — all Tailwind utility classes inline
8. **Vite build** — assets copied to `dist/`, paths resolved at build time

## File Reading Strategy

### Directory Structure
- Each section = subdirectory under `src/assets/gallery/`
- Section name = directory name (used as title)
- Documents = files in directory (images, PDFs, and `.md` descriptions all flat)

### Description Files
- `<asset-name>.md` alongside each asset
- Simple text or frontmatter:
  ```markdown
  ---
  title: "Project One"
  ---
  This is the description that users will see.
  ```
- If no `.md` exists, description is empty

### File Classification
- **Images** — `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif` → stored flat in `gallery/<section>/`
- **PDFs** — `.pdf` → stored flat in `gallery/<section>/`
- **Descriptions** — `<asset>.md` → stored flat alongside asset in `gallery/<section>/`

### Config Generation (future)
```typescript
async function readGalleryConfig(): Promise<GalleryConfig> {
  const galleryDir = 'src/assets/gallery';
  const sections: GallerySection[] = [];

  for (const sectionDir of readdirSync(galleryDir)) {
    const sectionPath = join(galleryDir, sectionDir);
    const title = sectionDir.charAt(0).toUpperCase() + sectionDir.slice(1);
    const docs: Document[] = [];

    // Read all files in section directory
    for (const file of readdirSync(sectionPath)) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
        docs.push({ src: `${sectionDir}/${file}`, type: 'image' });
      } else if (file.endsWith('.pdf')) {
        docs.push({ src: `${sectionDir}/${file}`, type: 'pdf' });
      } else if (file.endsWith('.md')) {
        // Skip description files when listing documents
        continue;
      }
    }

    // Read descriptions
    for (const doc of docs) {
      const descPath = join(sectionPath, doc.src.replace(/\.[^.]+$/, '.md'));
      const desc = readFileSync(descPath, 'utf-8').trim();
      doc.description = desc;
    }

    sections.push({ title, path: sectionDir, documents: docs });
  }

  return { sections };
}
```

## PDF Support Strategy

### Preview in Grid
- **PDFs** rendered as thumbnail preview (first page)
- **Fallback** — if thumbnail unavailable, show PDF icon placeholder
- **Icon** — use Lucide `FileText` or custom SVG PDF icon
- **Label** — show file extension hint below thumbnail

### PDF Viewer Overlay
- **Renderer** — `<iframe>` with `src` for PDFs (lighter, no dependency)
- **Alternative** — `<embed>` if iframe doesn't render in browser
- **Fallback** — show download button if PDF viewer fails
- **Styling** — `width: 100%; height: 100%` for full overlay
- **Close** — × button or click backdrop to close

### Browser Compatibility
- PDFs supported in Chrome, Firefox, Safari, Edge
- `object-fit: contain` for thumbnail previews
- `max-height: 50vh` for thumbnail to keep grid balanced with images

## Future Considerations

- Replace hardcoded data with JSON files or CMS
- Add image lazy loading
- Support PDFs/docs alongside images
- Add keyboard navigation (arrow keys)
- Responsive: 1 column on mobile, 2 on desktop
