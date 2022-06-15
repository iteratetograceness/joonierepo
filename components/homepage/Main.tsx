import * as styles from './styles'
import { ABOUT } from '@constants'

const Main = () => {
  return (
    <section className={styles.mainContainer}>
      <div>image</div>
      <div>
        {ABOUT.map(item => (
          <p key={item.title}>{item.title}</p>
        ))}
      </div>
    </section>
  )
}

export default Main
