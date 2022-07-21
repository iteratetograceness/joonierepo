import { m, useAnimation } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import * as styles from './styles'

type Props = {
  text: string
}

const RotateText = ({ text }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' })
  const controls = useAnimation()

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
      y: ['-50%', '0%'],
      rotateX: [-90, 0],
      scaleX: [0.4, 1],
      scaleY: [0.4, 1],
      transition: { duration: times[i] },
    }),
  }

  const backLetter = {
    initial: { y: '-120%', rotateX: 90 },
    rotate: (i: number) => ({
      y: ['0%', '50%'],
      rotateX: [0, 90],
      scaleX: [1, 0.4],
      scaleY: [1, 0.4],
      transition: { duration: times[i] },
    }),
  }

  const attributes = !isMobile
    ? {
        variants: main,
        animate: controls,
        initial: 'initial',
        onHoverStart: () => controls.start('rotate'),
      }
    : null

  return (
    <m.div
      className={styles.animateContainer}
      // variants={main}
      // animate={controls}
      // initial="initial"
      // onHoverStart={() => controls.start('rotate')}
      {...attributes}
    >
      <m.div className={styles.textContainer} variants={container}>
        {Array.from(text).map((char, i) => (
          <m.span custom={i} variants={frontLetter} className={styles.about} key={char + i.toString() + '-top'}>
            {char}
          </m.span>
        ))}
      </m.div>
      <m.div className={styles.textContainer} variants={container}>
        {Array.from(text).map((char, i) => (
          <m.span custom={i} variants={backLetter} className={styles.about} key={char + i.toString() + '-bottom'}>
            {char}
          </m.span>
        ))}
      </m.div>
      <div className={styles.aboutCover}>{text}</div>
    </m.div>
  )
}

export default RotateText
