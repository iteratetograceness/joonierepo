import { CodeProps } from 'react-markdown/lib/ast-to-react'
import * as styles from './styles'

// TODO: code block styling - use prism

const Code = ({ inline = false, children }: CodeProps) => {
  if (inline) return <code className={styles.inlineCode}>{children}</code>
  return <></>
}

export default Code
