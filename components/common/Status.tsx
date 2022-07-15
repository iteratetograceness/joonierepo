import * as styles from './styles'

type Props = {
  text: string
  className?: string
}

const Status = ({ text, className }: Props) => (
  <h1 className={styles.statusText + ' ' + className}>{text.toUpperCase()}</h1>
)

export default Status
