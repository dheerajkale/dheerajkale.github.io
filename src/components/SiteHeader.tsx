import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'border-b border-line bg-paper/85 text-ink backdrop-blur-md'
            : 'border-b border-transparent bg-transparent text-paper'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.35em]">
              DK
            </span>
            <span className="hidden h-4 w-px bg-current opacity-25 sm:block" />
            <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.22em] opacity-70 transition-opacity group-hover:opacity-100 sm:block">
              Dheeraj Kale
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`font-mono text-[0.62rem] uppercase tracking-[0.22em] transition-colors ${
                  active === id
                    ? scrolled
                      ? 'text-accent'
                      : 'text-paper'
                    : scrolled
                      ? 'text-muted hover:text-ink'
                      : 'text-paper/55 hover:text-paper'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className={`font-mono text-[0.62rem] uppercase tracking-[0.22em] transition-colors md:hidden ${
              scrolled ? 'text-ink' : 'text-paper/80'
            }`}
          >
            Contact
          </a>
        </div>
      </header>
    </>
  );
}
