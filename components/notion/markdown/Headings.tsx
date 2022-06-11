import { HeadingProps } from 'react-markdown/lib/ast-to-react'
import * as styles from './styles'

export const H1 = ({ children }: HeadingProps) => <h1 className={styles.h1}>{children}</h1>
export const H2 = ({ children }: HeadingProps) => <h2 className={styles.h2}>{children}</h2>
export const H3 = ({ children }: HeadingProps) => <h3 className={styles.h3}>{children}</h3>
export const H4 = ({ children }: HeadingProps) => <h4 className={styles.h4}>{children}</h4>
export const H5 = ({ children }: HeadingProps) => <h5 className={styles.h5}>{children}</h5>
export const H6 = ({ children }: HeadingProps) => <h6 className={styles.h6}>{children}</h6>
