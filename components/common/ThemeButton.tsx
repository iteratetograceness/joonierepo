import { useTheme } from 'next-themes'
import * as styles from './styles'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles.themeButton}>
      <button
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        type="button"
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
          console.log(theme)
        }}
      >
        <span>toggle theme</span>
      </button>
    </div>
  )
}

export default ThemeButton
