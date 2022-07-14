/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import * as styles from './styles'
import { ABOUT } from '@constants'
import { m } from 'framer-motion'
import RotateText from './RotateText'
import Button from '@components/common/Button'

const Main = () => {
  const main = {
    animate: { transition: { delayChildren: 0.2, staggerChildren: 0.2, duration: 0.5 } },
  }

  const items = {
    animate: { scale: 1 },
    initial: { scale: 0.9 },
  }

  return (
    <>
      <m.div key="homepage-1" variants={main} animate="animate" initial="initial" className={styles.mainContainer}>
        <m.div variants={items} className={styles.leftOfImage}>
          <p className={styles.welcomeText}>[ insert corny intro here ]</p>
          <svg viewBox="50 50 400 400" className={styles.svg} width="100%">
            <path
              id="curve"
              d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
              transform="rotate(140,250,250)"
              fill="transparent"
            />
            <text className={styles.curvedText}>
              <textPath xlinkHref="#curve" textLength="920">
                HELLO * THERE * FRIEND *
              </textPath>
            </text>
          </svg>
        </m.div>
        <m.div variants={items}>
          <Image
            src="/grace.jpg"
            alt=""
            layout="responsive"
            width={700}
            height={700}
            style={{ borderRadius: '20% 20%' }}
            priority
          />
        </m.div>
      </m.div>
      <hr className={styles.line} />
      <div>
        <div className={styles.aboutContainer}>
          {ABOUT.map(item => (
            <m.div
              key={item.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
              viewport={{ once: true }}
              className={styles.aboutItem}
            >
              <RotateText text={item.title} />
              <Button variant="outline" text={item.subtitle} href={item.href} animation />
              <hr className={styles.line} />
            </m.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Main
