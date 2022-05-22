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
    enter: { y: 0, opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.07 } },
    exit: { y: 80, opacity: 0 },
  }

  const navItems = {
    enter: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  }

  return isMounted ? (
    <nav aria-label="Main Menu">
      <m.ul className={styles.navContainer(isLarge)} variants={navContainer} animate="enter" initial="exit" exit="exit">
        {isMounted && isLarge ? (
          LINKS.map(link => (
            <m.li key={link.path} variants={navItems}>
              <Link href="" role="navigation">
                {link.label}
              </Link>
            </m.li>
          ))
        ) : (
          <m.section key="small-menu" className={styles.innerNav} variants={navItems}>
            <Link href="/" aria-label="Homepage Button" passHref>
              <a className={styles.logo}>/joonie</a>
            </Link>
            <button aria-expanded="false" aria-label="Mobile Navigation Button" className={styles.menuButton}>
              {/* toggle aria-label between open and close menu */}
              <MobileMenu color={theme === 'dark' ? '#f5f5f5' : '#1e1e1e'} />
            </button>
          </m.section>
        )}
      </m.ul>
    </nav>
  ) : (
    <p>loading</p>
  )
}

export default Navigation
