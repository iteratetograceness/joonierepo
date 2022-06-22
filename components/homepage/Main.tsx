import Image from 'next/image'
import * as styles from './styles'
import { ABOUT } from '@constants'
import { m, useAnimation } from 'framer-motion'

const Main = () => {
  const control1 = useAnimation()
  const control2 = useAnimation()
  const control3 = useAnimation()

  const controls = [control1, control2, control3]

  const main = {
    hover: { opacity: 1 },
  }

  const container = {
    rotate: { transition: { staggerChildren: 0.035 } },
  }

  const times = [0.5, 0.5, 0.5, 0.55, 0.6, 0.63, 0.57, 0.5]

  const frontLetter = {
    initial: { y: '0%', rotateX: 0 },
    rotate: (i: number) => ({
      y: ['-60%', '0%'],
      rotateX: [-90, 0],
      scaleX: [0.4, 1],
      scaleY: [0.4, 1],
      transition: { duration: times[i] },
    }),
  }

  const backLetter = {
    initial: { y: '-120%', rotateX: 90 },
    rotate: (i: number) => ({
      y: ['0%', '60%'],
      rotateX: [0, 90],
      scaleX: [1, 0.4],
      scaleY: [1, 0.4],
      transition: { duration: times[i] },
    }),
  }

  return (
    <section className={styles.mainContainer}>
      <div className={styles.leftOfImage}>hi im grace</div>
      <Image
        src="/grace.jpg"
        alt=""
        layout="responsive"
        width={700}
        height={700}
        // style={{ borderRadius: '20% 20%' }}
        priority
      />
      <div className={styles.aboutContainer}>
        {ABOUT.map((item, i) => (
          <m.div
            className={styles.animateContainer}
            key={item.title}
            variants={main}
            animate={controls[i]}
            initial="initial"
            onHoverStart={() => controls[i].start('rotate')}
            onAnimationComplete={() => controls[i].stop()}
          >
            <m.div className={styles.textContainer} variants={container}>
              {Array.from(item.title).map((char, i) => (
                <m.span custom={i} variants={frontLetter} className={styles.about} key={char + i}>
                  {char}
                </m.span>
              ))}
            </m.div>
            <m.div className={styles.textContainer} variants={container}>
              {Array.from(item.title).map((char, i) => (
                <m.span custom={i} variants={backLetter} className={styles.about} key={char + i}>
                  {char}
                </m.span>
              ))}
            </m.div>
            <div className={styles.aboutCover}>{item.title}</div>
          </m.div>
        ))}
      </div>
    </section>
  )
}

export default Main
