import { ArrowUpRight } from 'lucide-react';
import React from 'react';

export function ContactItem({
    label,
    value,
    href,
    icon,
    target = '_blank',
    rel = 'noopener noreferrer',
}: {
    label: string;
    value: string;
    href: string;
    icon: React.ReactNode;
    target?: string;
    rel?: string;
}) {
    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className="group flex items-center justify-between gap-5 border-b border-paper/15 py-5 transition-colors hover:border-paper/35"
        >
            <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-paper/15 text-paper/55 transition-colors group-hover:border-accent/70 group-hover:text-accent">
                    {icon}
                </span>
                <div className="min-w-0">
                    <span className="block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-paper/40">
                        {label}
                    </span>
                    <span className="mt-1 block truncate font-serif text-base text-paper/85 transition-colors group-hover:text-paper sm:text-lg">
                        {value}
                    </span>
                </div>
            </div>
            <ArrowUpRight
                className="h-4 w-4 shrink-0 text-paper/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
                strokeWidth={1.5}
            />
        </a>
    );
}
