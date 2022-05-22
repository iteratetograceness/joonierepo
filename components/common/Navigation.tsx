import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { m } from 'framer-motion'
import { useTheme } from 'next-themes'
import * as styles from './styles'
import Link from 'next/link'
import MobileMenu from '@components/svg/MobileMenu'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true)
  const isLarge = useMediaQuery({ query: '(min-width: 1100px)' })

  useEffect(() => {
    setIsMounted(true)
    console.log(isLarge)
  }, [isLarge])

  // const variants = {
  //   hidden: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   exit: { opacity: 0 },
  // }

  const navContainer = {
    enter: { opacity: 1, transition: { staggerChildren: 0.03, duration: 0.5 } },
    exit: { opacity: 0 },
  }

  const mobileNavContainer = {
    enter: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
    exit: { y: -100, opacity: 0 },
    hidden: { y: -100, opacity: 0 },
  }

  const navItems = {
    enter: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
    exit: { y: -70, opacity: 0 },
  }

  return isMounted ? (
    <m.nav aria-label={isLarge ? 'Main Menu' : 'Mobile Menu'}>
      {isMounted && isLarge ? (
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
      ) : (
        <m.section
          key="small-menu"
          className={styles.mobileNav}
          variants={mobileNavContainer}
          animate="enter"
          initial="hidden"
          exit="exit"
        >
          <Link href="/" passHref>
            <a className={styles.logo} role="navigation" aria-label="Homepage">
              / joonie
            </a>
          </Link>
          <button
            aria-expanded="false"
            aria-label="Mobile Navigation Button"
            className={styles.menuButton}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MobileMenu color={theme === 'dark' ? '#f5f5f5' : '#1e1e1e'} />
          </button>
          <div className={styles.mobileMenu(isMobileMenuOpen)}>
            <p>links</p>
            <button onClick={() => setIsMobileMenuOpen(false)}>x</button>
          </div>
        </m.section>
      )}
    </m.nav>
  ) : (
    <p>loading</p>
  )
}

export default Navigation
