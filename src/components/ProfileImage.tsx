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
        <div
            ref={containerRef}
            className="relative w-56 h-72 sm:w-64 sm:h-80"
        >
            <div
                aria-hidden
                className="profile-parallax-layer profile-texture-halftone profile-texture-grain -left-7 -top-5 z-0 h-[72%] w-[88%] bg-[#ff2d6a]"
                style={{
                    transform: `translate(${scrollOffset * 0.14}px, ${scrollOffset * 0.07}px) rotate(-3deg)`,
                }}
            />
            <div
                aria-hidden
                className="profile-parallax-layer profile-texture-stripes profile-texture-grain -right-8 -bottom-6 z-0 h-[78%] w-[82%] bg-[#00e8ff]"
                style={{
                    transform: `translate(${scrollOffset * -0.11}px, ${scrollOffset * 0.09}px) rotate(4deg)`,
                }}
            />
            <div
                aria-hidden
                className="profile-parallax-layer profile-texture-halftone -left-3 bottom-2 z-0 h-[38%] w-[55%] bg-[#ffe600]"
                style={{
                    transform: `translate(${scrollOffset * 0.08}px, ${scrollOffset * -0.06}px) rotate(6deg)`,
                }}
            />
            <div className="relative z-10 h-full w-full overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
