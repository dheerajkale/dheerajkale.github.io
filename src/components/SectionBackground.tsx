import { useEffect, useRef, useState } from 'react';

interface SectionBackgroundProps {
    accents?: [string, string];
}

interface Blob {
    color: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    width: string;
    height: string;
    opacity: number;
    blur: number;
    dx: number;
    dy: number;
}

export default function SectionBackground({ accents = ['#cfcfcf', '#8a8a8a'] }: SectionBackgroundProps) {
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

    const [primary, secondary] = accents;

    const blobs: Blob[] = [
        {
            color: primary,
            left: '-8%',
            top: '-18%',
            width: '30rem',
            height: '30rem',
            opacity: 0.18,
            blur: 90,
            dx: 0.1,
            dy: 0.06,
        },
        {
            color: secondary,
            right: '-10%',
            top: '22%',
            width: '26rem',
            height: '26rem',
            opacity: 0.14,
            blur: 90,
            dx: -0.09,
            dy: 0.1,
        },
        {
            color: primary,
            left: '32%',
            bottom: '-24%',
            width: '34rem',
            height: '34rem',
            opacity: 0.1,
            blur: 110,
            dx: 0.05,
            dy: -0.07,
        },
    ];

    return (
        <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {blobs.map((blob, i) => (
                <div
                    key={i}
                    className="parallax-layer rounded-full"
                    style={{
                        backgroundColor: blob.color,
                        left: blob.left,
                        right: blob.right,
                        top: blob.top,
                        bottom: blob.bottom,
                        width: blob.width,
                        height: blob.height,
                        opacity: blob.opacity,
                        filter: `blur(${blob.blur}px)`,
                        transform: `translate(${offset * blob.dx}px, ${offset * blob.dy}px)`,
                    }}
                />
            ))}
        </div>
    );
}
