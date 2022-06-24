import Link from 'next/link'
import { m, useAnimation } from 'framer-motion'
import * as styles from './styles'

type Props = {
  variant: 'solid' | 'outline'
  href?: string
  onClick?: () => void
  text: string
}

const Button = ({ variant, href, onClick, text }: Props) => {
  const arrow = {
    hidden: { right: 0, opacity: 0, transition: { right: { delay: 0.15 } } },
    enter: { right: 40, opacity: 1 },
  }

  const arrowAnim = useAnimation()

  if (href)
    return (
      <>
        <Link href={href} passHref>
          <m.a
            className={styles.button(variant === 'solid')}
            onHoverStart={() => arrowAnim.start('enter')}
            onHoverEnd={() => arrowAnim.start('hidden')}
          >
            {text}
          </m.a>
        </Link>
        <m.span className={styles.arrow} animate={arrowAnim} variants={arrow} initial="hidden">
          →
        </m.span>
      </>
    )

  return (
    <button className={styles.button(variant === 'solid')} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
