import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { m } from 'framer-motion'
import { useTheme } from 'next-themes'
import * as styles from './styles'
import Link from 'next/link'

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

  const mobileNavModal = {
    open: { height: '100vh', y: 0, zIndex: 999, transition: { duration: 0.4, ease: [0.3, 0, 0.46, 0.36] } },
    close: {
      height: '0px',
      y: -500,
      zIndex: -1,
      transition: { duration: 0.4, zIndex: { delay: 0.4 }, ease: [0.3, 0, 0.46, 0.36] },
    },
  }

  return isMounted ? (
    <m.nav aria-label={isLarge ? 'Main Menu' : 'Mobile Menu'}>
      {isMounted && isLarge ? (
        <>
          <m.ul className={styles.navContainer} variants={navContainer} animate="enter" initial="exit" exit="exit">
            {LINKS.map(link => (
              <m.li key={link.path} variants={navItems}>
                <Link href={link.path} passHref>
                  <a role="navigation" aria-label={link.label}>
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
              onClick={() => setIsMobileMenuOpen(true)}
            >
              Menu
            </button>
            <m.div
              key="mobile-menu"
              className={styles.mobileMenu(theme === 'dark')}
              variants={mobileNavModal}
              initial="close"
              animate={isMobileMenuOpen ? 'open' : 'close'}
              aria-hidden={isMobileMenuOpen ? 'false' : 'true'}
            >
              <button onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileClose}>
                X
              </button>
              <div id="mobile-links">
                {LINKS.map(link => (
                  <m.li key={link.path} variants={navItems}>
                    <Link href={link.path} passHref>
                      <a role="navigation" aria-label={link.label}>
                        {link.label}
                      </a>
                    </Link>
                  </m.li>
                ))}
              </div>
            </m.div>
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
