import { useEffect, useRef, useState } from 'react';

interface SectionDividerProps {
    primaryWords?: string[];
    secondaryWords?: string[];
    accent?: string;
    reverse?: boolean;
}

const DEFAULT_PRIMARY = [
    'ADVERTISING',
    'COPYWRITING',
    'BRAND BUILDING',
    'MEDIA PLANNING',
    'MARKETING STRATEGY',
    'CORPORATE COMMUNICATIONS',
];

const DEFAULT_SECONDARY = ['creativity', 'professionalism', 'discipline', 'strategic thinking', 'innovation', 'impact'];

function Separator({ color }: { color: string }) {
    return <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: color }} />;
}

function WordRow({ words, accent }: { words: string[]; accent: string }) {
    return (
        <div className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap">
            {words.map((word, i) => (
                <span key={i} className="flex items-center gap-8">
                    <span>{word}</span>
                    <Separator color={accent} />
                </span>
            ))}
        </div>
    );
}

export default function SectionDivider({
    primaryWords = DEFAULT_PRIMARY,
    secondaryWords = DEFAULT_SECONDARY,
    accent = '#ff2d6a',
    reverse = false,
}: SectionDividerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let raf = 0;
        const update = () => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            setOffset(center - window.innerHeight / 2);
        };
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden
            className="relative w-screen overflow-hidden bg-white py-14 lg:py-20 select-none"
        >
            <div
                className="parallax-layer texture-halftone -top-6 left-[6%] h-28 w-28 rotate-6"
                style={{ backgroundColor: accent, transform: `translate(${offset * 0.12}px, ${offset * 0.06}px)` }}
            />
            <div
                className="parallax-layer texture-stripes bottom-2 right-[8%] h-20 w-16 -rotate-6"
                style={{ backgroundColor: accent, transform: `translate(${offset * -0.1}px, ${offset * 0.1}px)` }}
            />
            <div
                className="parallax-layer h-3 w-3 rotate-45 right-[32%] top-2"
                style={{ backgroundColor: accent, transform: `translateY(${offset * -0.16}px)` }}
            />

            <div className="relative flex flex-col gap-2 lg:gap-3">
                <div className="flex overflow-hidden" style={{ transform: `translateY(${offset * 0.05}px)` }}>
                    <div
                        className="divider-marquee-track font-sans text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-black"
                        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
                    >
                        <WordRow words={primaryWords} accent={accent} />
                        <WordRow words={primaryWords} accent={accent} />
                    </div>
                </div>
                <div className="flex overflow-hidden" style={{ transform: `translateY(${offset * -0.05}px)` }}>
                    <div
                        className="divider-marquee-track font-serif text-base sm:text-lg lg:text-xl italic text-black/40"
                        style={{ animationDirection: reverse ? 'normal' : 'reverse' }}
                    >
                        <WordRow words={secondaryWords} accent={accent} />
                        <WordRow words={secondaryWords} accent={accent} />
                    </div>
                </div>
            </div>
        </div>
    );
}
