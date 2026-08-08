import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { FileText, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Document } from '../../types/gallery';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export function PdfPreview({ document, className = '' }: { document: Document; className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let disposed = false;
        setPdf(null);
        setError(false);

        const loadingTask = pdfjsLib.getDocument({ url: document.src });
        loadingTask.promise
            .then((doc) => {
                if (disposed) {
                    loadingTask.destroy();
                    return;
                }
                setPdf(doc);
            })
            .catch(() => {
                if (!disposed) setError(true);
            });

        return () => {
            disposed = true;
            loadingTask.destroy();
        };
    }, [document.src]);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas || !pdf) return;

        let cancelled = false;
        let currentPage: PDFPageProxy | null = null;
        let renderTask: { cancel(): void; promise: Promise<unknown> } | null = null;
        let observer: ResizeObserver | null = null;

        const render = () => {
            if (!currentPage) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (!width || !height) return;

            const baseViewport = currentPage.getViewport({ scale: 1 });
            const scale = Math.min(width / baseViewport.width, height / baseViewport.height);
            const viewport = currentPage.getViewport({ scale });

            if (
                Math.abs(canvas.width - viewport.width) < 1 &&
                Math.abs(canvas.height - viewport.height) < 1
            ) {
                return;
            }

            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.width = `${viewport.width}px`;
            canvas.style.height = `${viewport.height}px`;

            renderTask?.cancel();
            renderTask = currentPage.render({ canvas, viewport });
            renderTask.promise.catch(() => {});
        };

        pdf.getPage(1)
            .then((page) => {
                if (cancelled) return;
                currentPage = page;
                render();
                observer = new ResizeObserver(render);
                observer.observe(container);
            })
            .catch(() => {
                if (!cancelled) setError(true);
            });

        return () => {
            cancelled = true;
            observer?.disconnect();
            renderTask?.cancel();
        };
    }, [pdf]);

    if (error) {
        return (
            <div className={`flex flex-col items-center justify-center gap-2 text-black/40 ${className}`}>
                <FileText className="h-10 w-10" strokeWidth={1} />
                <span className="text-sm">PDF</span>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
            {!pdf && <Loader2 className="h-6 w-6 animate-spin text-black/30" strokeWidth={1.5} />}
            <canvas
                ref={canvasRef}
                className="max-h-full max-w-full rounded-sm shadow-md"
                style={{ visibility: pdf ? 'visible' : 'hidden' }}
            />
        </div>
    );
}
