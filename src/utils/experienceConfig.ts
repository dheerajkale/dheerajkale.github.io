import type { ExpItem } from '../types/experience';
import { parseMarkdown } from './parseMarkdown';

const markdownModules = import.meta.glob('../assets/experience/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
}) as Record<string, string>;

function pathFromModuleKey(key: string): string {
    const match = key.match(/assets\/experience\/(.+)$/);
    return match?.[1] ?? key;
}

function basename(path: string): string {
    const name = path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path;
    const dot = name.lastIndexOf('.');
    return dot === -1 ? name : name.slice(0, dot);
}

function toExpItem(relativePath: string, raw: string): ExpItem {
    const parsed = parseMarkdown(raw);
    const { frontmatter } = parsed;

    return {
        title: parsed.title ?? basename(relativePath),
        company: frontmatter.company ?? '',
        period: frontmatter.period,
        description: parsed.body || undefined,
    };
}

export function buildExperienceConfig(): ExpItem[] {
    return Object.entries(markdownModules)
        .map(([key, raw]) => ({
            relativePath: pathFromModuleKey(key),
            item: toExpItem(pathFromModuleKey(key), raw),
        }))
        .sort((a, b) => a.relativePath.localeCompare(b.relativePath))
        .map(({ item }) => item);
}
