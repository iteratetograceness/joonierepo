import Button from './Button'
import { CONTACT } from '@constants'
import * as styles from './styles'

const Footer = () => {
  return (
    <>
      <footer className={styles.footerContainer}>
        {/* on click animate arrow path pointing to buttons */}
        <Button variant="solid" onClick={() => console.log('click')} text="CONTACT ME" />
        <div className={styles.links}>
          {CONTACT.map(link => (
            <Button key={link.title} variant="outline" href={link.content} text={link.title} />
          ))}
        </div>
      </footer>
      <section>
        <p>Copyright © 2022 Jueun Grace Yun + Web Design Inspired By: </p>
      </section>
    </>
  )
}

export default Footer
