import { SHOP_LINKS } from '@constants'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import * as styles from './styles'

const ShopNav = () => {
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

  useEffect(() => setIsMounted(true), [])

  return isMounted && isMobile ? (
    <nav className={styles.mobileMenuContainer}>
      <h1 className={styles.logo}>joonieshop</h1>
      {SHOP_LINKS.map(link => (
        <Link key={link.label} href={link.path}>
          {link.label}
        </Link>
      ))}
    </nav>
  ) : (
    <nav className={styles.menuContainer}>
      <h1 className={styles.logo}>joonieshop</h1>
      {SHOP_LINKS.map(link => (
        <Link key={link.label} href={link.path}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default ShopNav
