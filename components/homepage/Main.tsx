import Image from 'next/image'
import * as styles from './styles'
import { ABOUT } from '@constants'
import { m } from 'framer-motion'

const Main = () => {
  const main = {
    hover: { opacity: 1 },
  }

  const container = {
    hover: { transition: { staggerChildren: 0.025 } },
  }

  const frontLetter = {
    initial: { y: '0%', rotateX: 0 },
    hover: { y: '100%', rotateX: -90 },
  }

  const backLetter = {
    initial: { y: '-100%', rotateX: 90 },
    hover: { y: '0%', rotateX: 0 },
  }

  return (
    <section className={styles.mainContainer}>
      <Image src="/grace.jpg" alt="" layout="responsive" width={700} height={700} priority />
      <div className={styles.aboutContainer}>
        {ABOUT.map(item => (
          <m.div key={item.title} variants={main} whileHover="hover">
            <m.div className={styles.textContainer} variants={container} whileHover="hover">
              {Array.from(item.title).map((char, i) => (
                <m.span
                  variants={frontLetter}
                  className={styles.about}
                  key={char + i}
                  style={{ y: '0%', rotateX: 0, opacity: 1 }}
                >
                  {char}
                </m.span>
              ))}
            </m.div>
            <m.div className={styles.textContainer} variants={container}>
              {Array.from(item.title).map((char, i) => (
                <m.span
                  variants={backLetter}
                  className={styles.about}
                  key={char + i}
                  style={{ y: '-100%', rotateX: 90, opacity: 1 }}
                >
                  {char}
                </m.span>
              ))}
            </m.div>
          </m.div>
        ))}
      </div>
    </section>
  )
}

export default Main
