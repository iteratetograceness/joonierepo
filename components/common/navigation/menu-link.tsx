'use client';

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
      {Array.from(label.toUpperCase()).map((char, index) => {
        if (italicIndexes.has(index)) {
          return (
            <em key={`${char}${index}`} className={styles.char}>
              {char}
            </em>
          );
        } else {
          return (
            <span key={`${char}${index}`} className={styles.char}>
              {char}
            </span>
          );
        }
      })}
      {pathname === href ? <span className={styles.char}>*</span> : null}
    </Link>
  );
});
