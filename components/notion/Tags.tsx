import { Tag } from '@custom-types/notion'
// import Link from 'next/link'
import { m } from 'framer-motion'
import { useTheme } from 'next-themes'
import * as styles from './styles'

type Props = {
  tags: Tag[]
}

const Tags = ({ tags }: Props) => {
  const { theme } = useTheme()
  const tagVariants = {
    hover: {
      backgroundColor: theme === 'dark' ? '#f5f5f5' : '#1e1e1e',
      color: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
    },
  }

  return (
    <ul className={styles.tagContainer} aria-label="Project tags">
      {tags.map(tag => {
        // const href = '/work/tags/' + tag.name
        return (
          // <Link href={href} key={tag.id} passHref>
          <m.a key={tag.id} className={styles.tag} variants={tagVariants} whileHover="hover">
            {tag.name.toLocaleUpperCase()}
          </m.a>
          // </Link>
        )
      })}
    </ul>
  )
}

export default Tags
