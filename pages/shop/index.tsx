import { ShopLayout } from '@components/shop'

const Shop = () => <div className={'h-[200vh]'}>hey store</div>

Shop.getLayout = (page: JSX.Element | JSX.Element[]) => <ShopLayout>{page}</ShopLayout>

export default Shop
