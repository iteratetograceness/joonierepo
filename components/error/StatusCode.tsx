import Link from 'next/link'
import * as styles from './styles'

type Props = {
  statusCode?: number
}

const StatusCode = ({ statusCode }: Props) => {
  const status = statusCode ? statusCode : 'OOF'

  return (
    <div className={styles.errorContainer}>
      <Link passHref href="/">
        <a className={styles.homeLink}>
          <span className={styles.arrow}>← </span>RETURN TO HOME
        </a>
      </Link>
      <div className={'noselect ' + styles.oval}>
        <h1 className={styles.statusMsg}>Oh drats — we bumped into a issue!</h1>
        {statusCode ? <h1 className={styles.statusCodeTopRight}>{status}</h1> : <p>OOF</p>}
        {statusCode ? <h1 className={styles.statusCodeBottomLeft}>{status}</h1> : <p>OOF</p>}
      </div>
    </div>
  )
}

export default StatusCode
