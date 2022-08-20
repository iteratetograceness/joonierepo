/* eslint-disable react/display-name */
import Button from '@components/common/Button'
import { SHOP_LINKS } from '@constants'
import Image from 'next/image'
import Link from 'next/link'
import { forwardRef, MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import * as styles from './styles'

const ShopNav = forwardRef<HTMLDivElement>((_, ref) => {
  const [isMounted, setIsMounted] = useState(false)
  const [openMobileNav, setOpenMobileNav] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

  const mobileNavRef = useRef<HTMLElement>(null)

  useEffect(() => setIsMounted(true), [])
  useLayoutEffect(() => {
    if (isMobile) {
      const content = (ref as MutableRefObject<HTMLDivElement>)?.current
      if (content) content.style.marginTop = (mobileNavRef?.current?.getBoundingClientRect().height || 300) + 'px'
    }
  }, [isMobile, openMobileNav, ref])

  return isMounted && isMobile ? (
    <nav ref={mobileNavRef} className={styles.mobileMenuContainer}>
      <Image
        src="https://snsyghebsujbdmfblkbw.supabase.co/storage/v1/object/public/shop/common/logo.png"
        alt="Joonie Shop"
        width="150"
        height="150"
      />
      <h1 className={styles.logo}>joonieshop</h1>
      <Button text="menu" onClick={() => setOpenMobileNav(!openMobileNav)} variant="outline" />
      <div className={styles.mobileLinks}>
        {openMobileNav &&
          SHOP_LINKS.map(link => (
            <Link key={link.label} href={link.path}>
              <p className={styles.mobileLink}>{link.label}</p>
            </Link>
          ))}
      </div>
    </nav>
  ) : (
    <nav className={styles.menuContainer}>
      <Image
        src="https://snsyghebsujbdmfblkbw.supabase.co/storage/v1/object/public/shop/common/logo.png"
        alt="Joonie Shop"
        width="170"
        height="170"
        layout="fixed"
      />
      <h1 className={styles.logo}>joonieshop</h1>
      {SHOP_LINKS.map(link => (
        <Link key={link.label} href={link.path}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
})

export default ShopNav
