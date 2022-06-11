import * as styles from './styles'

type Props = {
  statusCode?: number
}

const StatusCode = ({ statusCode }: Props) => {
  return (
    <div className={styles.errorContainer}>
      {statusCode ? <h1 className={styles.statusCode}>{statusCode}</h1> : <p>f</p>}
      <div className={styles.oval}>
        <h1 className={styles.statusMsg}>Oh drats — we bumped into a issue!</h1>
      </div>
    </div>
  )
}

export default StatusCode
