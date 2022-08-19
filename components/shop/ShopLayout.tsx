import { Footer, ThemeButton } from '@components/common'
import { useRef } from 'react'
import ShopNav from './ShopNav'
import * as styles from './styles'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const ShopLayout = ({ children }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <ShopNav ref={contentRef} />
        <div ref={contentRef} style={{ marginTop: 400 }}>
          {children}
        </div>
      </div>
      <Footer />
      <ThemeButton />
    </div>
  )
}

export default ShopLayout
