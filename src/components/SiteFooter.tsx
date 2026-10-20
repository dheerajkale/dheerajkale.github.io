import { ArrowUp } from 'lucide-react';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-paper/15 bg-ink px-5 py-10 text-paper sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.35em]">DK</span>
          <span className="h-4 w-px bg-paper/20" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/55">
            Dheeraj Kale · Advertising &amp; Corporate Communications
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Footer">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/55 transition-colors hover:text-paper"
            >
              {label}
            </a>
          ))}
          <a
            href="#top"
            className="group flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/55 transition-colors hover:text-paper"
          >
            Top
            <ArrowUp
              className="h-3 w-3 transition-transform group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-6xl items-center justify-between border-t border-paper/10 pt-6 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-paper/35">
        <span>© {new Date().getFullYear()} Dheeraj Kale</span>
        <span>Portfolio</span>
      </div>
    </footer>
  );
}
