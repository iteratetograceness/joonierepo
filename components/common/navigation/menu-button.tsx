'use client';

import { ButtonHTMLAttributes } from 'react';
import { Button } from '../button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	text?: string;
}

export function MenuButton({ text = 'Menu', ...props }: Props) {
	return <Button {...props}>{text}</Button>;
}
