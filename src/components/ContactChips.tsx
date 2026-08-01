export function ContactChips({
    label,
    href,
    icon,
    iconBg,
    iconColor,
    target = '_blank',
    rel = 'noopener noreferrer',
}: {
    label: string;
    href: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    target?: string;
    rel?: string;
}) {
    return (
        <a
            href={href}
            className="flex items-center gap-3 px-5 py-4 border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors"
            target={target}
            rel={rel}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBg}`}>
                {icon}
            </div>
            <span className="text-base">{label}</span>
        </a>
    );
}
