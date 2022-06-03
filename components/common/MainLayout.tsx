import Navigation from './Navigation'
import ThemeButton from './ThemeButton'
// import { m } from 'framer-motion'
import * as styles from './styles'
import { useEffect } from 'react'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const MainLayout = ({ children }: Props) => {
  useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--height', `${window.innerHeight}px`)
    }

    window.addEventListener('resize', documentHeight)

    return () => window.removeEventListener('resize', documentHeight)
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
