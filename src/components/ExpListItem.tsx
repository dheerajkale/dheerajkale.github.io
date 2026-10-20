import type { ExpItem } from '../types/experience.ts';

export function ExpListItem({
    item,
    isCurrent = false,
}: {
    item: ExpItem;
    isCurrent?: boolean;
}) {
    return (
        <li className="relative pb-10 pl-6 last:pb-0 sm:pl-8">
            <span
                aria-hidden
                className={`absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full ${
                    isCurrent ? 'bg-accent ring-4 ring-accent/10' : 'bg-paper ring-1 ring-ink/30'
                }`}
            />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
                {item.period && <span>{item.period}</span>}
                {isCurrent && <span className="text-accent">Current</span>}
            </div>

            <h2 className="mt-2 text-3xl leading-tight sm:text-4xl">{item.title}</h2>

            <p className="mt-1.5 font-sans text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                {item.company}
            </p>

            {item.description && (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                    {item.description}
                </p>
            )}
        </li>
    );
}
