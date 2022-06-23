import * as styles from './styles'
import { m } from 'framer-motion'
import { Line } from '@components/common'

const Name = () => {
  const name = {
    animate: { opacity: 1 },
    initial: { opacity: 0 },
  }

  return (
    <>
      <section className={styles.nameContainer}>
        <m.h1 variants={name} initial="initial" animate="animate" className={styles.name}>
          Jueun Grace Yun
        </m.h1>
        <Line className={'mt-6'} />
      </section>
      <section>
        <div className={styles.info}>
          <span>CONTENT CREATOR</span>
          <span>SOFTWARE ENGINEER</span>
          <span>ILLUSTRATOR</span>
        </div>
      </section>
    </>
  )
}

export default Name
