import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { m } from 'framer-motion'
import { useTheme } from 'next-themes'
import * as styles from './styles'
import Link from 'next/link'
import MobileMenuModal from './MobileMenuModal'

const Navigation = () => {
  const LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Blog', path: '/blog' },
    { label: 'Shop', path: '/shop' },
    { label: 'Contact', path: '/contact' },
  ]

  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isLarge = useMediaQuery({ query: '(min-width: 1100px)' })

  useEffect(() => {
    setIsMounted(true)
  }, [isLarge])

  const openModal = () => {
    setIsMobileMenuOpen(true)
    document.getElementById('menu-close-button')?.focus()
  }

  const closeModal = () => {
    setIsMobileMenuOpen(false)
    document.getElementById('menu-open-button')?.focus()
  }

  const navContainer = {
    enter: { opacity: 1, transition: { staggerChildren: 0.03, duration: 0.4, type: 'linear' } },
    exit: { opacity: 0 },
  }

  const mobileNavContainer = {
    enter: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
    exit: { y: -100, opacity: 0 },
  }

  const navItems = {
    enter: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
    exit: { y: -70, opacity: 0 },
  }

  const line = {
    enter: { x: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
    exit: { x: -300, opacity: 1 },
    hidden: { x: -300, opacity: 1 },
  }

  return isMounted ? (
    <m.nav aria-label={isLarge ? 'Main Menu' : 'Mobile Menu'} role="navigation" className="noselect">
      {isMounted && isLarge ? (
        <>
          <m.ul className={styles.navContainer} variants={navContainer} animate="enter" initial="exit" exit="exit">
            {LINKS.map(link => (
              <m.li key={link.path} variants={navItems}>
                <Link href={link.path} passHref>
                  <a role="navigation" aria-label={link.label} className={styles.linkItem}>
                    {link.label}
                  </a>
                </Link>
              </m.li>
            ))}
          </m.ul>
          <m.div
            key="nav-line"
            className={styles.underline(theme === 'dark')}
            variants={line}
            initial="hidden"
            animate="enter"
            exit="exit"
          />
        </>
      ) : (
        <>
          <m.section
            key="small-menu"
            className={styles.mobileNav}
            variants={mobileNavContainer}
            animate="enter"
            initial="exit"
            exit="exit"
          >
            <Link href="/" passHref>
              <a className={styles.logo} role="navigation" aria-label="Homepage">
                {isLarge ? 'JueunGraceYun' : 'Jueun'}
              </a>
            </Link>
            <button
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              aria-label="Mobile Navigation Button"
              onClick={() => openModal()}
              id="menu-open-button"
              className={styles.mobileButton}
            >
              Menu
            </button>
            <MobileMenuModal closeModal={closeModal} isOpen={isMobileMenuOpen} />
          </m.section>
          <m.div
            key="mobile-nav-line"
            className={styles.underline(theme === 'dark')}
            variants={line}
            initial="hidden"
            animate="enter"
            exit="exit"
          />
        </>
      )}
    </m.nav>
  ) : (
    <p>loading</p>
  )
}

export default Navigation
