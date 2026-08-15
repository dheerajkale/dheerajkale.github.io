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
            className="group flex items-center justify-between gap-6 border-b border-black/10 px-1 py-5 transition-colors hover:bg-black/[0.03] sm:px-4"
        >
            <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center text-black/45">
                    {icon}
                </span>
                <span className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                    {label}
                </span>
            </div>
            <div className="flex min-w-0 items-center gap-3">
                <span className="truncate text-base transition-colors group-hover:text-black sm:text-lg">
                    {value}
                </span>
                <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-black/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                    strokeWidth={1.5}
                />
            </div>
        </a>
    );
}
