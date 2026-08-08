export interface ParsedMarkdown {
  title?: string;
  body: string;
  frontmatter: Record<string, string>;
}

function parseFrontmatterValue(raw: string): string {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function parseMarkdown(raw: string): ParsedMarkdown {
  const trimmed = raw.trim();
  const frontmatter: Record<string, string> = {};

  if (!trimmed.startsWith('---')) {
    return { body: trimmed, frontmatter };
  }

  const end = trimmed.indexOf('---', 3);
  if (end === -1) {
    return { body: trimmed, frontmatter };
  }

  const frontmatterBlock = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + 3).trim();

  for (const line of frontmatterBlock.split('\n')) {
    const match = line.match(/^([\w-]+):\s*(.+?)\s*$/);
    if (!match) continue;

    const [, key, value] = match;
    if (key !== undefined && value !== undefined) {
      frontmatter[key] = parseFrontmatterValue(value);
    }
  }

  const title = frontmatter.title;
  return {
    ...(title !== undefined ? { title } : {}),
    body,
    frontmatter,
  };
}
