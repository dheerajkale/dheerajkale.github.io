import { useEffect, useRef, useState } from 'react';

interface ProfileImageProps {
    src: string;
    alt: string;
}

export default function ProfileImage({ src, alt }: ProfileImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const updateOffset = () => {
            const el = containerRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            setScrollOffset(elementCenter - viewportCenter);
        };

        updateOffset();
        window.addEventListener('scroll', updateOffset, { passive: true });
        window.addEventListener('resize', updateOffset);

        return () => {
            window.removeEventListener('scroll', updateOffset);
            window.removeEventListener('resize', updateOffset);
        };
    }, []);

    return (
        <figure ref={containerRef} className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div
                aria-hidden
                className="parallax-layer texture-halftone -left-6 -top-6 h-[55%] w-[55%] bg-paper-deep opacity-70"
                style={{ transform: `translateY(${scrollOffset * 0.04}px)` }}
            />
            <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 border border-ink/20" />

            <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover grayscale-[0.12] transition duration-700 hover:scale-[1.02] hover:grayscale-0"
                />
            </div>

            <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                <span>Dheeraj Kale</span>
                <span>Portrait</span>
            </figcaption>
        </figure>
    );
}
