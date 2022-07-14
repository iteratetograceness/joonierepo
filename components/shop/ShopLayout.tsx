import ShopNav from './ShopNav'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const ShopLayout = ({ children }: Props) => (
  <div>
    <ShopNav />
    {children}
  </div>
)

export default ShopLayout
