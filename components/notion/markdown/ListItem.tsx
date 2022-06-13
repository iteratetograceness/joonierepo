import { LiProps } from 'react-markdown/lib/ast-to-react'
import * as styles from './styles'

const ListItem = ({ checked, ordered, index, children }: LiProps) => {
  // TODO: Ordered list item
  if (ordered) {
    return (
      <li className={styles.text}>
        {index}. {children}
      </li>
    )
  }

  if (checked) {
    return <li className={styles.text}>{children}</li>
  }

  return <li className={styles.text}>{children}</li>
}

export default ListItem
