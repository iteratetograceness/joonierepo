import { Image as ImageType } from '@custom-types/notion'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import Code from './Code'
import { H1, H2, H3, H4, H5, H6 } from './Headings'
import * as styles from './styles'

type Props = {
  md: (string | ImageType)[]
}

const COMPONENTS = {
  code: Code,
  p: ({ children }: ReactMarkdownProps) => <p className={styles.p}>{children}</p>,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
}

const Markdown = ({ md }: Props) => (
  <div className={styles.markdown}>
    {md.map(chunk => {
      if (typeof chunk === 'string') return <ReactMarkdown components={COMPONENTS}>{chunk}</ReactMarkdown>
      return (
        <Image
          key={chunk.image.src}
          alt={chunk.caption}
          src={chunk.image.src}
          width={chunk.image.width}
          height={chunk.image.height}
          // layout="responsive"
          placeholder="blur"
          blurDataURL={chunk.base64}
          className={styles.image}
          objectFit="contain"
        />
      )
    })}
  </div>
)

export default Markdown
