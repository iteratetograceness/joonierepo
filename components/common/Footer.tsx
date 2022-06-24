/* eslint-disable @typescript-eslint/no-empty-function */
import Button from './Button'
import { CONTACT } from '@constants'
import * as styles from './styles'

const Footer = () => {
  return (
    <>
      <footer className={styles.footerContainer}>
        {/* on click animate arrow path pointing to buttons */}
        <Button variant="solid" text="CONTACT ME" isLarge className={styles.contactButtonSm} />
        <div className={styles.links}>
          <Button variant="solid" text="CONTACT ME" isLarge className={styles.contactButtonLg} />
          {CONTACT.map(link => (
            <Button
              key={link.title}
              variant="outline"
              href={link.content}
              text={link.title}
              className={styles.footerButtons}
            />
          ))}
        </div>
      </footer>
      <section>
        <p>Copyright © 2022 Jueun Grace Yun</p>
      </section>
    </>
  )
}

export default Footer
