export type DocumentType = 'image' | 'pdf';

export interface Document {
  src: string;
  type: DocumentType;
  title?: string;
  description?: string;
}

export interface GallerySection {
  title: string;
  path: string;
  description?: string;
  documents: Document[];
}

export interface GalleryConfig {
  sections: GallerySection[];
}
