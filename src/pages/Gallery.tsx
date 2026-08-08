import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { DocumentPreview, DocumentViewer } from '../components/gallery/DocumentViewer';
import { buildGalleryConfig } from '../utils/galleryConfig';
import type { Document } from '../types/gallery';

const AUTO_CYCLE_MS = 5500;
const galleryConfig = buildGalleryConfig();

function SectionArrow({
    direction,
    onClick,
    label,
}: {
    direction: 'prev' | 'next';
    onClick: () => void;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="shrink-0 p-2 text-black/25 transition hover:text-black"
        >
            {direction === 'prev' ? (
                <ChevronLeft className="h-7 w-7" strokeWidth={1.25} />
            ) : (
                <ChevronRight className="h-7 w-7" strokeWidth={1.25} />
            )}
        </button>
    );
}

export default function Gallery() {
    const sections = galleryConfig.sections;

    const [sectionIndex, setSectionIndex] = React.useState(0);
    const [docIndex, setDocIndex] = React.useState(0);
    const [autoCycle, setAutoCycle] = React.useState(true);
    const [openDoc, setOpenDoc] = React.useState<Document | null>(null);

    const sectionIndexRef = React.useRef(sectionIndex);
    const docIndexRef = React.useRef(docIndex);
    sectionIndexRef.current = sectionIndex;
    docIndexRef.current = docIndex;

    const activeSection = sections[sectionIndex]!;
    const documents = activeSection.documents ?? [];
    const activeDoc = documents[docIndex];
    const hasSections = sections.length > 0;
    const hasMultipleSections = sections.length > 1;
    const hasMultipleDocs = documents.length > 1;
    const canAutoCycle =
        hasMultipleSections || sections.some((section) => section.documents.length > 1);

    const goToSection = (index: number) => {
        setSectionIndex(index);
        setDocIndex(0);
    };

    const nextSection = () => goToSection((sectionIndex + 1) % sections.length);
    const prevSection = () => goToSection((sectionIndex - 1 + sections.length) % sections.length);

    React.useEffect(() => {
        setDocIndex(0);
    }, [sectionIndex]);

    React.useEffect(() => {
        if (!autoCycle || openDoc || !canAutoCycle) return;

        const timer = window.setInterval(() => {
            const si = sectionIndexRef.current;
            const di = docIndexRef.current;
            const sectionDocs = sections[si]?.documents ?? [];

            if (sectionDocs.length === 0) {
                if (sections.length > 1) {
                    setSectionIndex((si + 1) % sections.length);
                    setDocIndex(0);
                }
                return;
            }

            if (di < sectionDocs.length - 1) {
                setDocIndex(di + 1);
                return;
            }

            if (sections.length > 1) {
                setSectionIndex((si + 1) % sections.length);
                setDocIndex(0);
            } else {
                setDocIndex(0);
            }
        }, AUTO_CYCLE_MS);

        return () => window.clearInterval(timer);
    }, [autoCycle, openDoc, canAutoCycle, sections]);

    const viewerDocIndex = openDoc ? documents.findIndex((d) => d.src === openDoc.src) : -1;

    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-white text-black">
            <header className="mb-16 text-center">
                <h1 className="text-3xl">Gallery</h1>
            </header>

            {!hasSections ? (
                <p className="text-black/40">No gallery items yet.</p>
            ) : (
                <div className="w-full max-w-10/12">

                    <div className="flex items-center gap-2 sm:gap-6">
                        {hasMultipleSections && (
                            <SectionArrow direction="prev" onClick={prevSection} label="Previous section" />
                        )}

                        <div className="min-w-0 flex-1">
                            {activeDoc ? (
                                <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
                                    <div className="flex h-96 w-full items-center justify-center">
                                        <div
                                            key={`${sectionIndex}-${docIndex}`}
                                            className="flex h-full w-full items-center justify-center animate-[fadeIn_0.4s_ease-out]"
                                        >
                                            <DocumentPreview document={activeDoc} onOpen={() => setOpenDoc(activeDoc)} />
                                        </div>
                                    </div>
                                    <div className="md:pt-2">
                                        <h2 className="text-3xl">{activeSection.title}</h2>
                                        {activeSection.description ? (
                                            <p className="text-xl leading-relaxed text-black/50">{activeSection.description}</p>
                                        ) : (
                                            <p className="text-sm text-black/30">No description available.</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-black/40">This section has no documents yet.</p>
                            )}
                        </div>

                        {hasMultipleSections && (
                            <SectionArrow direction="next" onClick={nextSection} label="Next section" />
                        )}
                    </div>
                    <div className="mt-8 flex flex-col gap-2 items-center justify-center">
                        <div>
                            {hasMultipleSections && (
                                <p className="mb-1 text-sm text-black/40"> {sectionIndex + 1} / {sections.length} </p>
                            )}
                        </div>

                        <div>
                            {canAutoCycle && (
                                <button
                                    type="button"
                                    onClick={() => setAutoCycle((prev) => !prev)}
                                    className="items-center gap-2 self-start text-xl text-black/40 transition hover:text-black"
                                >
                                    {autoCycle ? <Pause className="h-3.5 w-3.5" strokeWidth={1.5} /> : <Play className="h-3.5 w-3.5" strokeWidth={1.5} />}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {openDoc && viewerDocIndex >= 0 && (
                <DocumentViewer
                    document={openDoc}
                    onClose={() => setOpenDoc(null)}
                    onPrev={() => {
                        const newIndex = (viewerDocIndex - 1 + documents.length) % documents.length;
                        setDocIndex(newIndex);
                        setOpenDoc(documents[newIndex]!);
                    }}
                    onNext={() => {
                        const newIndex = (viewerDocIndex + 1) % documents.length;
                        setDocIndex(newIndex);
                        setOpenDoc(documents[newIndex]!);
                    }}
                    hasPrev={hasMultipleDocs}
                    hasNext={hasMultipleDocs}
                />
            )}
        </div>
    );
}
