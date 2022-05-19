import { useTheme } from 'next-themes'
import { DarkMode, LightMode, ThemeIcon } from '@icons'
import * as styles from './styles'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
      className={styles.themeButton + ' animation'}
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        console.log(theme)
      }}
    >
      <ThemeIcon
        fill={theme === 'dark' ? '#1e1e1e' : '#f5f5f5'}
        stroke={theme === 'dark' ? '#f5f5f5' : '#1e1e1e'}
        className={styles.outerThemeIcon}
      >
        {theme === 'dark' ? <LightMode color="#f5f5f5" /> : <DarkMode color="#1e1e1e" />}
      </ThemeIcon>
    </button>
  )
}

export default ThemeButton
