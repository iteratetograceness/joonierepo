import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { m, useCycle } from 'framer-motion'
import Link from 'next/link'
import MobileMenuModal from './MobileMenuModal'
import { LINKS } from '@constants'
import Circle from '@components/svg/Circle'
import { Line } from '@components/common'
import { useTheme } from 'next-themes'
import * as styles from './styles'

const Navigation = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [open, cycleOpen] = useCycle(false, true)
  const isLarge = useMediaQuery({ query: '(min-width: 1100px)' })
  const { theme } = useTheme()

  useEffect(() => {
    cycleOpen(0)
    setIsMounted(true)
  }, [isLarge, cycleOpen])

  const openModal = () => cycleOpen(1)

  const closeModal = () => cycleOpen(0)

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

  // TODO: Loading state animation

  return isMounted ? (
    <m.nav aria-label={isLarge ? 'Main Menu' : 'Mobile Menu'} role="navigation" className="noselect">
      {isMounted && isLarge ? (
        <>
          <m.ul className={styles.navContainer} variants={navContainer} animate="enter" initial="exit">
            {LINKS.map(link => (
              <m.li key={link.label} variants={navItems}>
                <Link href={link.path} passHref>
                  <a role="navigation" aria-label={link.label} className={styles.linkItem}>
                    <Circle className={styles.circle} />
                    {link.label}
                  </a>
                </Link>
              </m.li>
            ))}
          </m.ul>
          <Line className={styles.navLine} />
        </>
      ) : (
        <>
          <m.ul
            key="small-menu"
            className={styles.mobileNav}
            variants={mobileNavContainer}
            animate="enter"
            initial="exit"
          >
            <li>
              <Link href="/" passHref>
                <a className={styles.logo} role="navigation" aria-label="Homepage">
                  {theme === 'dark' ? '🤍' : '🖤'}
                </a>
              </Link>
            </li>
            <li>
              <button
                type="button"
                aria-expanded={open ? 'true' : 'false'}
                aria-label="Mobile Navigation Button"
                onClick={() => openModal()}
                id="menu-open-button"
                className={styles.mobileButton}
              >
                Menu
              </button>
            </li>
            <MobileMenuModal closeModal={closeModal} isOpen={open} />
          </m.ul>
          <Line className={styles.navLine} />
        </>
      )}
    </m.nav>
  ) : (
    <p>loading</p>
  )
}

export default Navigation
