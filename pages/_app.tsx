import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { LazyMotion, domAnimation, MotionConfig, AnimatePresence } from 'framer-motion'
import { MainLayout } from '@components/common'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <MainLayout>{page}</MainLayout>)

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter onExitComplete={() => console.log('hi')}>
          <ThemeProvider attribute="class">{getLayout(<Component {...pageProps} />)}</ThemeProvider>
        </AnimatePresence>
      </LazyMotion>
    </MotionConfig>
  )
}
