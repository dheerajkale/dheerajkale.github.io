import React from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, FileText, Image as ImageIcon } from 'lucide-react';
import { DocumentViewer } from '../components/gallery/DocumentViewer';
import { PdfPreview } from '../components/gallery/PdfPreview';
import { buildGalleryConfig } from '../utils/galleryConfig';
import type { Document } from '../types/gallery';
import SectionLabel from '../components/SectionLabel';

const galleryConfig = buildGalleryConfig();

function pad(value: number): string {
    return String(value).padStart(2, '0');
}

function DocumentCard({
    document,
    index,
    sectionTitle,
    onOpen,
}: {
    document: Document;
    index: number;
    sectionTitle: string;
    onOpen: () => void;
}) {
    return (
        <figure className="group flex flex-col">
            <button
                type="button"
                onClick={onOpen}
                className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper-deep/40 transition-colors hover:border-ink/40 focus-visible:border-ink/40"
                aria-label={`Open ${document.title ?? `${sectionTitle} piece ${index + 1}`}`}
            >
                <span className="absolute left-3 top-3 z-10 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                    {pad(index + 1)}
                </span>
                <span className="absolute right-3 top-3 z-10 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                    {document.type === 'pdf' ? (
                        <FileText className="h-3 w-3" strokeWidth={1.5} />
                    ) : (
                        <ImageIcon className="h-3 w-3" strokeWidth={1.5} />
                    )}
                    {document.type === 'pdf' ? 'PDF' : 'Image'}
                </span>

                <div className="flex h-full w-full items-center justify-center p-5">
                    {document.type === 'image' ? (
                        <img
                            src={document.src}
                            alt={document.title ?? `${sectionTitle} campaign image`}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                        />
                    ) : (
                        <PdfPreview document={document} className="h-full w-full" />
                    )}
                </div>

                <span className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-ink/45 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-paper">
                        View piece
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/40 text-paper">
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                </span>
            </button>

            <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="font-serif text-sm text-ink/80">
                    {document.title ?? `${sectionTitle} - ${pad(index + 1)}`}
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                    {document.type === 'pdf' ? 'Document' : 'Campaign'}
                </span>
            </figcaption>
        </figure>
    );
}

export default function Gallery() {
    const sections = galleryConfig.sections;
    const [sectionIndex, setSectionIndex] = React.useState(0);
    const [openDoc, setOpenDoc] = React.useState<Document | null>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);
    const tabListRef = React.useRef<HTMLDivElement>(null);

    const activeSection = sections[sectionIndex];
    const documents = activeSection?.documents ?? [];
    const viewerDocIndex = openDoc ? documents.findIndex((doc) => doc.src === openDoc.src) : -1;

    React.useEffect(() => {
        const tabList = tabListRef.current;
        if (!tabList) return;

        const updateScrollState = () => {
            setCanScrollLeft(tabList.scrollLeft > 1);
            setCanScrollRight(tabList.scrollLeft + tabList.clientWidth < tabList.scrollWidth - 1);
        };

        updateScrollState();
        tabList.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);
        const observer = new ResizeObserver(updateScrollState);
        observer.observe(tabList);

        return () => {
            tabList.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
            observer.disconnect();
        };
    }, []);

    const scrollTabs = (direction: -1 | 1) => {
        const tabList = tabListRef.current;
        if (!tabList) return;

        tabList.scrollBy({
            left: direction * Math.max(220, tabList.clientWidth * 0.6),
            behavior: 'smooth',
        });
    };

    const goToSection = (index: number) => {
        setSectionIndex(index);
        setOpenDoc(null);
    };

    return (
        <section
            id="work"
            className="w-full scroll-mt-16 border-y border-line bg-paper-deep/30 px-5 py-24 sm:px-8 md:py-32 lg:px-12"
        >
            <div className="mx-auto w-full max-w-6xl">
                <SectionLabel>Selected Work</SectionLabel>

                <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <h1 className="max-w-3xl text-balance text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                        The work speaks before I do.
                    </h1>
                    <p className="max-w-sm text-base leading-relaxed text-muted">
                        Campaigns and communication across print, digital, outdoor, and electronic
                        media. Select a collection to explore.
                    </p>
                </div>

                {sections.length === 0 ? (
                    <p className="mt-16 text-muted">No gallery items yet.</p>
                ) : (
                    <>
                        <div className="mt-12 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => scrollTabs(-1)}
                                disabled={!canScrollLeft}
                                aria-label="Scroll collections left"
                                className="hidden h-9 w-9 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-ink/40 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
                            >
                                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                            </button>

                            <div
                                ref={tabListRef}
                                className="-mx-5 flex min-w-0 flex-1 gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
                                role="tablist"
                                aria-label="Work collections"
                            >
                                {sections.map((section, index) => {
                                    const isActive = index === sectionIndex;
                                    return (
                                        <button
                                            key={section.path}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            onClick={() => goToSection(index)}
                                            className={`flex shrink-0 items-center gap-2 border px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] transition-colors ${
                                                isActive
                                                    ? 'border-ink bg-ink text-paper'
                                                    : 'border-line text-muted hover:border-ink/40 hover:text-ink'
                                            }`}
                                        >
                                            {section.title}
                                            <span
                                                className={`text-[0.55rem] ${
                                                    isActive ? 'text-paper/50' : 'text-muted/60'
                                                }`}
                                            >
                                                {pad(section.documents.length)}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                type="button"
                                onClick={() => scrollTabs(1)}
                                disabled={!canScrollRight}
                                aria-label="Scroll collections right"
                                className="hidden h-9 w-9 shrink-0 items-center justify-center border border-line text-muted transition-colors hover:border-ink/40 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
                            >
                                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-3xl sm:text-4xl">{activeSection?.title}</h2>
                                {activeSection?.description && (
                                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
                                        {activeSection.description}
                                    </p>
                                )}
                            </div>
                            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted">
                                {documents.length} {documents.length === 1 ? 'piece' : 'pieces'}
                            </p>
                        </div>

                        {documents.length === 0 ? (
                            <p className="mt-12 text-muted">This collection has no pieces yet.</p>
                        ) : (
                            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                                {documents.map((document, index) => (
                                    <DocumentCard
                                        key={`${activeSection?.path ?? 'section'}-${document.src}`}
                                        document={document}
                                        index={index}
                                        sectionTitle={activeSection?.title ?? 'Selected Work'}
                                        onOpen={() => setOpenDoc(document)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {openDoc && viewerDocIndex >= 0 && (
                <DocumentViewer
                    document={openDoc}
                    onClose={() => setOpenDoc(null)}
                    onPrev={() => {
                        const newIndex = (viewerDocIndex - 1 + documents.length) % documents.length;
                        setOpenDoc(documents[newIndex] ?? openDoc);
                    }}
                    onNext={() => {
                        const newIndex = (viewerDocIndex + 1) % documents.length;
                        setOpenDoc(documents[newIndex] ?? openDoc);
                    }}
                    hasPrev={documents.length > 1}
                    hasNext={documents.length > 1}
                />
            )}
        </section>
    );
}
