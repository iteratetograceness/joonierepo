import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { m, AnimatePresence } from 'framer-motion'
import * as styles from './styles'
import Link from 'next/link'
import { LINKS } from '@constants'
import Circle from '@components/svg/Circle'

type Props = {
  closeModal: () => void
  isOpen: boolean
}

const MobileMenuModal = ({ closeModal, isOpen }: Props) => {
  const { events } = useRouter()
  const { theme } = useTheme()
  const modalRef = useRef<HTMLElement>(null)

  const handleTabKey = (e: KeyboardEvent) => {
    const focusableModalElements: NodeListOf<HTMLElement> | undefined = modalRef?.current?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )

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
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [isOpen])

  useEffect(() => {
    document.getElementById('menu-close-button')?.focus()
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

  useEffect(() => {
    events.on('routeChangeStart', closeModal)
    events.on('routeChangeComplete', () => document.getElementById('skip-to-main-content')?.focus())

    return () => {
      // unsubscribe to event on unmount to prevent memory leak
      events.off('routeChangeStart', closeModal)
    }
  }, [closeModal, events])

  const modalContainer = {
    open: {
      height: '100vh',
      y: 0,
      transition: { duration: 1, delay: 0, damping: 40, delayChildren: 0.2 },
    },
    closed: {
      height: '0vh',
      y: -90,
      transition: {
        delay: 0.3,
        stiffness: 100,
        damping: 40,
      },
    },
  }

  const innerModal = {
    open: {
      opacity: 1,
      transition: { duration: 2, type: 'tween', staggerChildren: 0.09, delayChildren: 0.2 },
    },
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const modalItem = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1200, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1200 },
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <m.dialog
          id="mobile-menu"
          ref={modalRef}
          key="mobile-menu"
          className={styles.mobileMenu(theme === 'dark')}
          variants={modalContainer}
          initial={{ height: '0px', y: -90 }}
          animate="open"
          exit="closed"
          aria-hidden={isOpen ? 'false' : 'true'}
          aria-label="Mobile Navigation Modal"
          aria-modal="true"
          role="dialog"
          layout
        >
          <m.button
            onClick={closeModal}
            className={styles.mobileClose}
            aria-label="Close mobile menu."
            id="menu-close-button"
            tabIndex={isOpen ? 0 : -1}
          >
            X
          </m.button>
          <m.div className={styles.mobileLinks} variants={innerModal} initial="closed" animate="open" exit="closed">
            {LINKS.map(link => (
              <m.li key={link.path} className={styles.mobileLinkItem(theme === 'dark')} variants={modalItem}>
                <Link href={link.path} passHref>
                  <m.a
                    key={link.path}
                    role="navigation"
                    aria-label={link.label}
                    tabIndex={isOpen ? 0 : -1}
                    className={styles.linkItem}
                  >
                    <Circle className={styles.circle} />
                    {link.label}
                  </m.a>
                </Link>
              </m.li>
            ))}
          </m.div>
        </m.dialog>
      )}
    </AnimatePresence>
  )
}

export default MobileMenuModal
