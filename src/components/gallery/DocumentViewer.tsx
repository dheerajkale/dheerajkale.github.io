import { useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Document } from '../../types/gallery';
import { DocumentThumbnail } from './DocumentThumbnail';
import { PdfPagesViewer } from './PdfPagesViewer';

interface DocumentViewerProps {
    document: Document;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

export function DocumentViewer({
    document,
    onClose,
    onPrev,
    onNext,
    hasPrev = false,
    hasNext = false,
}: DocumentViewerProps) {
    useEffect(() => {
        const previousOverflow = window.document.documentElement.style.overflow;
        window.document.documentElement.style.overflow = 'hidden';
        window.document.body.style.overflow = 'hidden';
        return () => {
            window.document.documentElement.style.overflow = previousOverflow;
            window.document.body.style.overflow = previousOverflow;
        };
    }, []);

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
                className="relative flex min-h-0 flex-1 items-center justify-center px-6 sm:px-16"
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

                <div className="flex max-h-full w-full max-w-4xl flex-col">
                    {document.type === 'image' ? (
                        <>
                            <div className="flex min-h-0 items-center justify-center">
                                <img
                                    src={document.src}
                                    alt={document.title ?? 'Gallery image'}
                                    className="max-h-[60vh] w-auto max-w-full object-contain"
                                />
                            </div>
                            {(document.title || document.description) && (
                                <div className="mt-8 max-w-xl self-center text-center">
                                    {document.title && <p className="mb-2 text-lg text-white/90">{document.title}</p>}
                                    {document.description && (
                                        <p className="text-sm leading-relaxed text-white/45">{document.description}</p>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex min-h-0 max-h-screen flex-1 flex-col overflow-hidden rounded-lg bg-white/[0.03]">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
                                <div className="min-w-0">
                                    {document.title ? (
                                        <h3 className="truncate text-lg text-white/90">{document.title}</h3>
                                    ) : (
                                        <h3 className="text-lg text-white/90">PDF document</h3>
                                    )}
                                </div>
                                <a
                                    href={document.src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex shrink-0 items-center gap-1.5 text-sm text-white/60 transition hover:text-white"
                                >
                                    Open
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                            <div className="min-h-0 max-h-screen flex-1 overflow-y-auto px-6 py-6">
                                <PdfPagesViewer document={document} />
                            </div>
                        </div>
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
