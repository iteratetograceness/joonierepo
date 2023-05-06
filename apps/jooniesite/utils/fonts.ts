import { Libre_Caslon_Text, Libre_Franklin } from '@next/font/google';

export const libreCaslonText = Libre_Caslon_Text({
	weight: '400',
	style: ['normal', 'italic'],
	display: 'swap',
	subsets: ['latin'],
	preload: true
});

export const libreFranklin = Libre_Franklin({
	subsets: ['latin'],
	display: 'swap',
	preload: true
});
