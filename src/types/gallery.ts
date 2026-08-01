export interface Document {
  src: string;
  description?: string;
}

export interface GallerySection {
  title: string;
  documents: Document[];
}
