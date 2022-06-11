import Navigation from './Navigation'
import ThemeButton from './ThemeButton'
import resizeHeight from '@custom-utils/resizeHeight'
import * as styles from './styles'
import { useEffect } from 'react'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const MainLayout = ({ children }: Props) => {
  useEffect(() => {
    const resize = resizeHeight()
    return resize
  }, [])

  return (
    <main className={styles.main}>
      <a className={styles.skipToMainContent} href="#main-content">
        Skip to Main Content
      </a>
      <Navigation />
      <div id="main-content">{children}</div>
      <ThemeButton />
    </main>
  )
}

export default MainLayout
