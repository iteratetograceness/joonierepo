import Image from 'next/image'
import * as styles from './styles'
import { ABOUT } from '@constants'

const Main = () => {
  return (
    <section className={styles.mainContainer}>
      <Image src="/grace.jpg" alt="" layout="responsive" width={700} height={700} />
      <div>
        {ABOUT.map(item => (
          <p key={item.title} className={styles.about}>
            {item.title}
          </p>
        ))}
      </div>
    </section>
  )
}

export default Main
