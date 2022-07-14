import { SHOP_LINKS } from '@constants'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import * as styles from './styles'

const ShopNav = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

  return isMobile ? (
    <nav className={styles.mobileMenuContainer}>
      {SHOP_LINKS.map(link => (
        <Link key={link.label} href={link.path}>
          {link.label}
        </Link>
      ))}
    </nav>
  ) : (
    <nav>
      <h1>joonieshop</h1>
      {SHOP_LINKS.map(link => (
        <Link key={link.label} href={link.path}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default ShopNav
