'use client';

import { ButtonHTMLAttributes } from 'react';
import { Button } from '../button';
// import { RotatingText } from '../rotating-text';
import { RotatingText } from 'ui';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export function MenuButton({ text = 'Menu', ...props }: Props) {
  return (
    <Button {...props}>
      <RotatingText text={text} key='menu-button' />
    </Button>
  );
}
