import Navigation from './Navigation'
import ThemeButton from './ThemeButton'
import * as styles from './styles'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const MainLayout = ({ children }: Props) => (
  <div className={styles.main}>
    <ThemeButton />
    <Navigation />
    {children}
  </div>
)

export default MainLayout
