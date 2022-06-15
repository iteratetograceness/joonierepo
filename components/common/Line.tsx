import { m } from 'framer-motion'
import * as styles from './styles'

type Props = {
  className: string
}

const Line = ({ className }: Props) => {
  const line = {
    enter: { x: 0, opacity: 1, transition: { type: 'spring', bounce: 0.4 } },
    exit: { x: -300, opacity: 1 },
    hidden: { x: -300, opacity: 0 },
  }

  return (
    <m.div
      key="nav-line"
      className={styles.underline + ' ' + className}
      variants={line}
      initial="hidden"
      animate="enter"
    />
  )
}

export default Line
