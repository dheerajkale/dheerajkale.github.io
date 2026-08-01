import React from 'react';
import type { GallerySection, Document } from '../types/gallery';

export default function Gallery() {
  const sections: GallerySection[] = [
    {
      title: 'Projects',
      documents: [
        { src: '/assets/project1.jpg', description: 'Project one description' },
        { src: '/assets/project2.png', description: 'Project two description' },
      ],
    },
    {
      title: 'Work Samples',
      documents: [
        { src: '/assets/sample1.jpg', description: 'Sample work one' },
      ],
    },
    {
      title: 'Portfolio',
      documents: [],
    },
  ];

  const [current, setCurrent] = React.useState(0);
  const [openDoc, setOpenDoc] = React.useState<Document | null>(null);

  const next = () =>
    setCurrent((prev) => (prev + 1) % sections.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + sections.length) % sections.length);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center px-5 py-12 bg-white text-black">
      <h1 className="text-3xl font-semibold mb-8 text-center">Gallery</h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={prev}
          className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
        >
          ← Prev
        </button>
        <button
          onClick={next}
          className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
        >
          Next →
        </button>
      </div>

      <div className="w-full max-w-9/12 flex flex-col gap-4">
        {sections.map((section, index) => (
          <section
            key={index}
            className={`border rounded p-6 flex flex-col gap-4 transition ${
              index === current ? 'border-black bg-black/5' : 'border-gray-300'
            }`}
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {section.documents.map((doc, docIndex) => (
                <div key={docIndex} className="border rounded p-4 flex flex-col items-center gap-2">
                  <img
                    src={doc.src}
                    alt={section.title}
                    className="max-w-full h-auto max-h-40 object-contain"
                  />
                  {doc.description && (
                    <p className="text-sm text-center text-gray-600">
                      {doc.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Active section indicator */}
      <div className="mt-4 flex gap-2">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Document viewer */}
      {openDoc && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setOpenDoc(null)}
        >
          <div
            className="relative bg-white p-6 rounded max-w-4xl w-11/12 max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenDoc(null)}
              className="absolute top-4 right-4 text-2xl font-bold"
            >
              ×
            </button>
            <img
              src={openDoc.src}
              alt="Full view"
              className="max-w-full h-auto max-h-[80vh] object-contain"
            />
            {openDoc.description && (
              <p className="mt-4 text-gray-600">{openDoc.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
