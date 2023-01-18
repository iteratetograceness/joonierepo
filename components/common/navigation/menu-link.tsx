import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ForwardedRef, forwardRef } from 'react';
import { libreCaslonText } from '../../../utils/fonts';
import styles from './index.module.css';

interface Props extends LinkProps {
  label: string;
  href: string;
  italics?: number[];
}

export const MenuLink = forwardRef(function MenuLink(
  { label, href, italics, onClick }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const pathname = usePathname();
  const italicIndexes = new Set(italics);

  return (
    <Link
      onClick={onClick}
      className={libreCaslonText.className}
      href={href}
      ref={ref}
    >
      {Array.from(label.toUpperCase()).map((char, index) => (
        <span
          key={`${char}${index}`}
          className={styles.char}
          style={{
            fontStyle: italicIndexes.has(index) ? 'italic' : 'unset',
            fontWeight: pathname === href ? 700 : 400,
          }}
        >
          {char}
        </span>
      ))}
    </Link>
  );
});