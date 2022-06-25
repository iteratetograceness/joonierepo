import * as styles from './styles'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const Grid = ({ children }: Props) => {
  return <section className={styles.grid}>{children}</section>
}

export default Grid
