import { ArrowUpRight, ChevronLeft, ChevronRight, FileText, X } from 'lucide-react';
import type { Document } from '../../types/gallery';
import { DocumentThumbnail } from './DocumentThumbnail';

interface DocumentViewerProps {
    document: Document;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

function PdfPresentation({ document }: { document: Document }) {
    return (
        <div className="flex max-w-md flex-col items-center text-center">
            <FileText className="mb-6 h-12 w-12 text-white/25" strokeWidth={1} />
            {document.title && <h3 className="mb-3 text-2xl text-white sm:text-3xl">{document.title}</h3>}
            {document.description && (
                <p className="mb-8 text-base leading-relaxed text-white/55">{document.description}</p>
            )}
            <a
                href={document.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
                Open PDF in new tab
                <ArrowUpRight className="h-4 w-4" />
            </a>
        </div>
    );
}

export function DocumentViewer({
    document,
    onClose,
    onPrev,
    onNext,
    hasPrev = false,
    hasNext = false,
}: DocumentViewerProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex flex-col bg-black/92"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Document viewer"
        >
            <div className="flex items-center justify-end px-6 py-5 sm:px-10">
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1 text-white/50 transition hover:text-white"
                    aria-label="Close viewer"
                >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
            </div>

            <div
                className="relative flex flex-1 items-center justify-center px-6 sm:px-16"
                onClick={(e) => e.stopPropagation()}
            >
                {hasPrev && onPrev && (
                    <button
                        type="button"
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/30 transition hover:text-white sm:left-8"
                        aria-label="Previous document"
                    >
                        <ChevronLeft className="h-7 w-7" strokeWidth={1.25} />
                    </button>
                )}

                <div className="flex max-h-[75vh] w-full max-w-5xl flex-col items-center justify-center">
                    {document.type === 'image' ? (
                        <>
                            <img
                                src={document.src}
                                alt={document.title ?? 'Gallery image'}
                                className="max-h-[60vh] w-auto max-w-full object-contain"
                            />
                            {(document.title || document.description) && (
                                <div className="mt-8 max-w-xl text-center">
                                    {document.title && <p className="mb-2 text-lg text-white/90">{document.title}</p>}
                                    {document.description && (
                                        <p className="text-sm leading-relaxed text-white/45">{document.description}</p>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <PdfPresentation document={document} />
                    )}
                </div>

                {hasNext && onNext && (
                    <button
                        type="button"
                        onClick={onNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/30 transition hover:text-white sm:right-8"
                        aria-label="Next document"
                    >
                        <ChevronRight className="h-7 w-7" strokeWidth={1.25} />
                    </button>
                )}
            </div>
        </div>
    );
}

export function DocumentPreview({ document, onOpen }: { document: Document; onOpen: () => void }) {
    return <DocumentThumbnail document={document} onClick={onOpen} showMediaOnly />;
}
