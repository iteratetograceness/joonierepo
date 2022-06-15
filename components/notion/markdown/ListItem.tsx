import { LiProps } from 'react-markdown/lib/ast-to-react'
import { useTheme } from 'next-themes'
import * as styles from './styles'

const ListItem = ({ checked, ordered, index, className, children }: LiProps) => {
  const { theme } = useTheme()
  // TODO: Ordered list item
  if (ordered) {
    return (
      <li className={styles.text}>
        {index}. {children}
      </li>
    )
  }

  if (className === 'task-list-item') {
    return checked ? <li className={styles.strikethrough}>{children}</li> : <li className={styles.text}>{children}</li>
  }

  return <li className={styles.li(theme === 'dark')}>{children}</li>
}

export default ListItem
