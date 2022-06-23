import type { NextPage } from 'next'
import { Name } from '@components/homepage'
import Main from '@components/homepage/Main'

const Home: NextPage = () => {
  return (
    <>
      <Name />
      <Main />
    </>
  )
}

export default Home
