import { Footer } from '@components/common'
import ShopNav from './ShopNav'
import * as styles from './styles'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const ShopLayout = ({ children }: Props) => (
  <div className={styles.container}>
    <div className={styles.main}>
      <ShopNav />
      {children}
    </div>

    <Footer />
  </div>
)

export default ShopLayout
