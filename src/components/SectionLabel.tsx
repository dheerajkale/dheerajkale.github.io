interface SectionLabelProps {
  index?: string;
  children: string;
  tone?: 'light' | 'dark';
}

export default function SectionLabel({ index, children, tone = 'light' }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] ${
        tone === 'dark' ? 'text-paper/50' : 'text-muted'
      }`}
    >
      <span className={tone === 'dark' ? 'text-accent' : 'text-accent'}>{index}</span>
      <span className={`h-px w-8 ${tone === 'dark' ? 'bg-paper/25' : 'bg-line'}`} />
      <span>{children}</span>
    </div>
  );
}
