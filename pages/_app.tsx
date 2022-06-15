import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { LazyMotion, domAnimation, MotionConfig, AnimatePresence } from 'framer-motion'
import { MainLayout } from '@components/common'
import Head from 'next/head'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const getLayout = Component.getLayout ?? (page => <MainLayout>{page}</MainLayout>)

  return (
    <>
      <Head>
        <title>jueungraceyun</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter>
            <ThemeProvider attribute="class">
              {getLayout(<Component {...pageProps} key={router.asPath} />)}
            </ThemeProvider>
          </AnimatePresence>
        </LazyMotion>
      </MotionConfig>
    </>
  )
}
