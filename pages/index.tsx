import type { NextPage } from 'next'
import { Name } from '@components/homepage'
import { AnimatePresence } from 'framer-motion'
import Main from '@components/homepage/Main'

const Home: NextPage = () => {
  return (
    <AnimatePresence>
      <Name />
      <Main />
    </AnimatePresence>
  )
}

export default Home
