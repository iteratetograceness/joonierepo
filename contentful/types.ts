import { Document } from '@contentful/rich-text-types';

export interface EmbeddedAsset {
  sys: { id: string };
  url: string;
  description: string;
}

export interface RichTextContent {
  json: Document;
  links: {
    assets: {
      block: EmbeddedAsset[];
    };
  };
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  content: RichTextContent;
}
