import * as styles from './styles'
import { m } from 'framer-motion'

const Name = () => {
  const name = {
    animate: { opacity: 1 },
    initial: { opacity: 0 },
  }

  return (
    <m.h1 variants={name} initial="initial" animate="animate" className={styles.name}>
      Jueun Grace Yun
    </m.h1>
  )
}

export default Name
