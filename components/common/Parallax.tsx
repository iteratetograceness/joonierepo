/**
 * https://samuelkraft.com/blog/spring-parallax-framer-motion-guide
 */

import { useState, useRef, useLayoutEffect, ReactNode } from 'react'
import { m, useViewportScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

type ParallaxProps = {
  children: ReactNode
  offset?: number
}

const Parallax = ({ children, offset = 50 }: ParallaxProps): JSX.Element => {
  const prefersReducedMotion = useReducedMotion()
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const ref = useRef(null)

  const { scrollY } = useViewportScroll()

  // start animation when in view:
  const initial = elementTop - clientHeight
  // end animation when scrolled by offset
  const final = elementTop + offset

  const yRange = useTransform(scrollY, [initial, final], [offset, -offset])
  const y = useSpring(yRange, { stiffness: 400, damping: 90 })

  useLayoutEffect(() => {
    const element = ref.current
    // save our layout measurements in a function in order to trigger
    // it both on mount and on resize
    const onResize = () => {
      // use getBoundingClientRect instead of offsetTop in order to
      // get the offset relative to the viewport
      if (element)
        setElementTop((element as HTMLElement).getBoundingClientRect().top + window.scrollY || window.pageYOffset)
      setClientHeight(window.innerHeight)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [ref])

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return <m.div style={{ y }}>{children}</m.div>
}

export default Parallax
