import { ArrowDown } from 'lucide-react';

const LINES = [
    'You don’t have to look too close to see.',
    'You don’t have to search too hard to find.',
    'Because the ones with an exceptional edge are too conspicuous to miss.',
    'Now that I have your attention, it shouldn’t be too difficult for you to figure out.',
];

export default function Landing() {
    return (
        <section className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden bg-ink px-5 pb-8 pt-24 text-paper sm:px-8 lg:px-12">
            <div
                aria-hidden
                className="pointer-events-none absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-accent/[0.08] blur-[130px]"
            />

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center py-16 text-center">
                <p
                    className="reveal-up mb-10 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-paper/40"
                    style={{ animationDelay: '120ms' }}
                >
                    A portfolio in plain sight
                </p>

                <div className="max-w-2xl space-y-3">
                    {LINES.map((line, index) => (
                        <p
                            key={line}
                            className="reveal-up font-serif text-sm leading-relaxed text-paper/55 sm:text-base"
                            style={{ animationDelay: `${240 + index * 160}ms` }}
                        >
                            {line}
                        </p>
                    ))}
                </div>

                <div
                    className="reveal-up mt-10 flex flex-col items-center gap-5"
                    style={{ animationDelay: '980ms' }}
                >
                    <span className="h-10 w-px bg-accent/70" />
                    <p className="font-display text-3xl italic leading-none text-paper sm:text-4xl">
                        Congratulations! Your search ends here.
                    </p>
                </div>
            </div>

            <div
                className="reveal-up mx-auto flex w-full max-w-6xl gap-6 border-t border-paper/15 pt-6 flex-row items-center justify-center"
                style={{ animationDelay: '1200ms' }}
            >
                <a
                    href="#about"
                    className="group flex items-center gap-3 self-start font-mono text-[0.6rem] uppercase tracking-[0.24em] text-paper/50 transition-colors hover:text-paper sm:self-auto"
                >
                    Scroll to begin
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 transition-colors group-hover:border-paper/60">
                        <ArrowDown
                            className="scroll-pulse h-3.5 w-3.5"
                            strokeWidth={1.5}
                        />
                    </span>
                </a>
            </div>
        </section>
    );
}
