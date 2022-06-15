import type { NextPage } from 'next'
import { Line } from '@components/common'
import { Name } from '@components/homepage'
import { AnimatePresence } from 'framer-motion'

const Home: NextPage = () => {
  return (
    <AnimatePresence>
      <section className={'mb-12'}>
        <Name />
        <Line className={'mt-6'} />
      </section>
      <div className={'flex justify-between mb-6'}>
        <span>CONTENT CREATOR</span>
        <span>SOFTWARE ENGINEER</span>
      </div>
    </AnimatePresence>
  )
}

export default Home
