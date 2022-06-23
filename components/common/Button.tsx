import Link from 'next/link'
import * as styles from './styles'

type Props = {
  variant: 'solid' | 'outline'
  href?: string
  onClick?: () => void
  text: string
}

const Button = ({ variant, href, onClick, text }: Props) => {
  if (href)
    return (
      <Link href={href} passHref>
        <a className={styles.button(variant === 'solid')}>{text}</a>
      </Link>
    )

  return (
    <button className={styles.button(variant === 'solid')} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
