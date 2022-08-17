import { Status } from '@components/common'
import { ShopLayout } from '@components/shop'
import { ShopHome } from '@components/shop'
import { useEffect, useState } from 'react'

const Shop = () => {
  const [shopStatus, setShopStatus] = useState('live')

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SHOP_STATUS) setShopStatus(process.env.NEXT_PUBLIC_SHOP_STATUS)
  }, [])

  switch (shopStatus) {
    case 'live':
      return <ShopHome />
    case 'comingsoon':
      return <Status text="Coming Soon" />
    case 'maintenance':
      return <Status text="Under Maintenance" />
  }
}

Shop.getLayout = (page: JSX.Element | JSX.Element[]) => {
  return <ShopLayout>{page}</ShopLayout>
}

export default Shop
