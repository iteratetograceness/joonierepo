import * as styles from './styles'

type Props = {
  title: string
}

const Title = ({ title }: Props) => <h2 className={styles.title}>{title}</h2>

export default Title
