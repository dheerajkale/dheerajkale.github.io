import { FileText } from 'lucide-react';
import type { Document } from '../../types/gallery';
import { PdfPreview } from './PdfPreview';

interface DocumentThumbnailProps {
  document: Document;
  className?: string;
  onClick?: () => void;
  showMediaOnly?: boolean;
}

export function DocumentThumbnail({
  document,
  className = '',
  onClick,
  showMediaOnly = false,
}: DocumentThumbnailProps) {
  const interactive = onClick !== undefined;

  const content =
    document.type === 'image' ? (
      <img
        src={document.src}
        alt={document.title ?? 'Gallery image'}
        className="max-h-full max-w-full object-contain transition duration-300 group-hover:opacity-90"
      />
    ) : showMediaOnly ? (
        <PdfPreview document={document} className="h-full w-full" />
    ) : (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <FileText className="h-10 w-10 text-white/25" strokeWidth={1} />
        {document.title && <p className="text-lg text-white/90">{document.title}</p>}
        {document.description && (
          <p className="max-w-md text-sm leading-relaxed text-white/55">{document.description}</p>
        )}
      </div>
    );

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group flex h-full w-full items-center justify-center focus:outline-none focus-visible:opacity-70 ${className}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
      {content}
    </div>
  );
}
