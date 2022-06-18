import { LiProps } from 'react-markdown/lib/ast-to-react'
import { useTheme } from 'next-themes'
import * as styles from './styles'
import { useEffect, useState } from 'react'

const ListItem = ({ checked, ordered, index, className, children }: LiProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setIsMounted(true), [])

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

  return isMounted && theme === 'dark' ? (
    <li className={styles.darkLi}>{children}</li>
  ) : (
    <li className={styles.lightLi}>{children}</li>
  )
}

export default ListItem
