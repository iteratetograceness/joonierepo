import { Document } from '@contentful/rich-text-types';

export interface EmbeddedAsset {
	sys: { id: string };
	url: string;
	description: string;
	width: number;
	height: number;
	contentType: string;
	thumbnail?: string;
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
