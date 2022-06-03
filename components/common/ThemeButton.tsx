import { useTheme } from 'next-themes'
import { DarkMode, LightMode, ThemeIcon } from '@icons'
import { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import * as styles from './styles'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  // https://github.com/vercel/next.js/discussions/35773#discussioncomment-2622885
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
  }

  return (
    <m.button
      initial="initial"
      animate="animate"
      variants={variants}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
      className={styles.themeButton + ' animation'}
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      <ThemeIcon
        fill={theme === 'dark' ? '#1e1e1e' : '#f5f5f5'}
        stroke={theme === 'dark' ? '#f5f5f5' : '#1e1e1e'}
        className={styles.outerThemeIcon}
      >
        {theme === 'dark' ? <LightMode color="#f5f5f5" /> : <DarkMode color="#1e1e1e" />}
      </ThemeIcon>
    </m.button>
  )
}

export default ThemeButton
