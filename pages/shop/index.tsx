import { Status } from '@components/common'
import { ShopLayout } from '@components/shop'
import { useEffect, useState } from 'react'

const Shop = () => {
  const [shopStatus, setShopStatus] = useState('default')

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SHOP_STATUS) setShopStatus(process.env.NEXT_PUBLIC_SHOP_STATUS)
  }, [])

  switch (shopStatus) {
    case 'live':
      return <div className={'h-[200vh]'}>hey store</div>
    case 'comingsoon':
      return <Status text="Coming Soon" />
    case 'maintenance':
      return <Status text="Under Maintenance" />
    default:
      return null
  }
}

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SHOP_STATUS === 'live')
  Shop.getLayout = (page: JSX.Element | JSX.Element[]) => <ShopLayout>{page}</ShopLayout>

export default Shop
