import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { m } from 'framer-motion'
import * as styles from './styles'
import Link from 'next/link'

type Props = {
  closeModal: () => void
  isOpen: boolean
}

const MobileMenuModal = ({ closeModal, isOpen }: Props) => {
  const LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Blog', path: '/blog' },
    { label: 'Shop', path: '/shop' },
    { label: 'Contact', path: '/contact' },
  ]

  const { theme } = useTheme()
  const modalRef = useRef<HTMLElement>(null)
  const handleTabKey = (e: KeyboardEvent) => {
    const focusableModalElements: NodeListOf<HTMLElement> | undefined = modalRef?.current?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )

    console.log(focusableModalElements)
    if (
      focusableModalElements &&
      focusableModalElements[0] &&
      focusableModalElements[focusableModalElements.length - 1]
    ) {
      const firstElement: HTMLElement = focusableModalElements[0]
      const lastElement: HTMLElement = focusableModalElements[focusableModalElements.length - 1]

      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        return e.preventDefault()
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        return e.preventDefault()
      }
    }
  }

  useEffect(() => {
    const keyListener = (e: KeyboardEvent): void => {
      const keyListenersMap = new Map([
        ['Escape', closeModal],
        ['Tab', handleTabKey],
      ])
      const listener = keyListenersMap.get(e.code)
      if (listener) return listener(e)
    }

    const ref = modalRef.current
    ref?.addEventListener('keydown', keyListener)
    return () => ref?.removeEventListener('keydown', keyListener)
  })

  const mobileNavModal = {
    open: { height: '100vh', y: 0, zIndex: 999, transition: { duration: 0.4, ease: [0.3, 0, 0.46, 0.36] } },
    close: {
      height: '0px',
      y: -500,
      zIndex: -1,
      transition: { duration: 0.4, zIndex: { delay: 0.4 }, ease: [0.3, 0, 0.46, 0.36] },
    },
  }

  return (
    <m.dialog
      ref={modalRef}
      key="mobile-menu"
      className={styles.mobileMenu(theme === 'dark')}
      variants={mobileNavModal}
      initial="close"
      animate={isOpen ? 'open' : 'close'}
      aria-hidden={isOpen ? 'false' : 'true'}
      aria-label="Mobile Navigation Modal"
      aria-modal="true"
      role="dialog"
    >
      <button
        onClick={closeModal}
        className={styles.mobileClose}
        aria-label="Close mobile menu."
        id="menu-close-button"
        tabIndex={isOpen ? 0 : -1}
      >
        X
      </button>
      <div id="mobile-links" className={styles.mobileLinks}>
        {LINKS.map(link => (
          <li key={link.path}>
            <Link href={link.path} passHref>
              <a role="navigation" aria-label={link.label} tabIndex={isOpen ? 0 : -1}>
                {link.label}
              </a>
            </Link>
          </li>
        ))}
      </div>
    </m.dialog>
  )
}

export default MobileMenuModal
