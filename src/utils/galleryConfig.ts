import type { Document, DocumentType, GalleryConfig, GallerySection } from '../types/gallery';
import { parseMarkdown } from './parseMarkdown';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

const assetModules = import.meta.glob('../assets/gallery/**/*.{jpg,jpeg,png,webp,gif,svg,pdf}', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>;

const markdownModules = import.meta.glob('../assets/gallery/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
}) as Record<string, string>;

interface MarkdownMeta {
    title?: string;
    body: string;
}

function pathFromModuleKey(key: string): string {
    const match = key.match(/assets\/gallery\/(.+)$/);
    return match?.[1] ?? key;
}

function extension(path: string): string {
    const dot = path.lastIndexOf('.');
    return dot === -1 ? '' : path.slice(dot).toLowerCase();
}

function basename(path: string): string {
    const name = path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path;
    const dot = name.lastIndexOf('.');
    return dot === -1 ? name : name.slice(0, dot);
}

function sectionTitleFromDir(dir: string): string {
    return dir
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function documentType(ext: string): DocumentType | null {
    if (IMAGE_EXTENSIONS.has(ext)) return 'image';
    if (ext === '.pdf') return 'pdf';
    return null;
}

function buildMarkdownLookup(): Map<string, MarkdownMeta> {
    const lookup = new Map<string, MarkdownMeta>();

    for (const [key, raw] of Object.entries(markdownModules)) {
        lookup.set(pathFromModuleKey(key), parseMarkdown(raw));
    }

    return lookup;
}

function enrichDocument(relativePath: string, doc: Document, markdownLookup: Map<string, MarkdownMeta>): Document {
    const descKey = `${relativePath.slice(0, relativePath.lastIndexOf('/'))}/${basename(relativePath)}.md`;
    const meta = markdownLookup.get(descKey);

    if (!meta) return doc;

    return {
        ...doc,
        title: meta.title ?? doc.title,
        description: meta.body || doc.description,
    };
}

function enrichSection(dir: string, section: GallerySection, markdownLookup: Map<string, MarkdownMeta>): GallerySection {
    const sectionMeta = markdownLookup.get(`${dir}/${dir}.md`);

    if (!sectionMeta) return section;

    return {
        ...section,
        title: sectionMeta.title ?? section.title,
        description: sectionMeta.body || section.description,
    };
}

export function buildGalleryConfig(): GalleryConfig {
    const markdownLookup = buildMarkdownLookup();
    const sectionMap = new Map<string, { relativePath: string; doc: Document }[]>();

    for (const [key, url] of Object.entries(assetModules)) {
        const relativePath = pathFromModuleKey(key);
        const ext = extension(relativePath);
        const type = documentType(ext);
        if (!type) continue;

        const slash = relativePath.indexOf('/');
        if (slash === -1) continue;

        const sectionDir = relativePath.slice(0, slash);
        const entry = {
            relativePath,
            doc: { src: url, type } satisfies Document,
        };

        const entries = sectionMap.get(sectionDir) ?? [];
        entries.push(entry);
        sectionMap.set(sectionDir, entries);
    }

    const sections: GallerySection[] = Array.from(sectionMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([dir, entries]) => {
            const section: GallerySection = {
                title: sectionTitleFromDir(dir),
                path: dir,
                documents: entries
                    .sort((a, b) => a.relativePath.localeCompare(b.relativePath))
                    .map(({ relativePath, doc }) => enrichDocument(relativePath, doc, markdownLookup)),
            };

            return enrichSection(dir, section, markdownLookup);
        });

    return { sections };
}
