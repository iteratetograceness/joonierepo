import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { m } from 'framer-motion'
import * as styles from './styles'

const Navigation = () => {
  const LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Blog', path: '/blog' },
    { label: 'Shop', path: '/shop' },
    { label: 'Contact', path: '/contact' },
  ]

  const [isMounted, setIsMounted] = useState(false)
  const isLarge = useMediaQuery({ query: '(min-width: 1100px)' })

  useEffect(() => {
    setIsMounted(true)
    console.log(isLarge)
  }, [isLarge])

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return isMounted ? (
    <ul className={styles.navContainer(isLarge)}>
      {isMounted && isLarge ? (
        LINKS.map(link => (
          <m.p
            key={link.path}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'linear', duration: 1 }}
          >
            {link.label}
          </m.p>
        ))
      ) : (
        <m.div
          key="small-menu"
          className={styles.innerNav}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: 'easeInOut', duration: 1.3 }}
        >
          <p>logo</p>
          <a href='' >menu icon</a>
        </m.div>
      )}
    </ul>
  ) : (
    <p>loading</p>
  )
}

export default Navigation
