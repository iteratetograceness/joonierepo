import * as styles from './styles'

type Props = {
  title: string
  subtitle?: string
  className: string
}

const BigHeading = ({ title, subtitle, className }: Props) => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title + ' ' + className}>{title.toUpperCase()}</h1>
      {subtitle ? <h2 className={styles.subtitle}>{subtitle.toUpperCase()}</h2> : null}
    </div>
  )
}

export default BigHeading
