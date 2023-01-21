import { ButtonHTMLAttributes } from 'react';
import { Button } from '../button';
import { RotatingText } from '../rotating-text';

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
