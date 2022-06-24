import Button from './Button'
import { CONTACT } from '@constants'
import * as styles from './styles'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <footer className={styles.footerContainer}>
        {/* on click animate arrow path pointing to buttons */}
        <Button variant="solid" onClick={() => console.log('click')} text="CONTACT ME" isLarge />
        <div className={styles.links}>
          {CONTACT.map(link => (
            <Button key={link.title} variant="outline" href={link.content} text={link.title} />
          ))}
        </div>
      </footer>
      <section>
        <p>
          Copyright © 2022 Jueun Grace Yun | Web Design Inspired By <Link href="https://eumray.com/">eumRay</Link> and{' '}
          <Link href="https://www.dariaizbash.com/">Dasha Izbash</Link>.
        </p>
      </section>
    </>
  )
}

export default Footer
