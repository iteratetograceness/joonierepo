import * as styles from './styles'

type Props = {
  title: string
  subtitle?: string
  className: string
}

const BigHeading = ({ title, subtitle, className }: Props) => {
  return (
    <div className={styles.titleContainer}>
      {subtitle ? <h3 className={styles.subtitle}>{subtitle.toUpperCase()}</h3> : null}
      <h2 className={styles.title + ' ' + className}>{title.toUpperCase()}</h2>
    </div>
  )
}

export default BigHeading
