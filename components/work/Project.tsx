/* eslint-disable react/no-children-prop */
import { NotionPage, Image as ImageType } from '@custom-types/notion'
import { BigHeading } from '@components/notion'
import * as styles from './styles'
import Image from 'next/image'
import Tags from '@components/notion/Tags'
import { Markdown } from '@components/notion/markdown'

type Props = {
  pageInfo: NotionPage
  markdown: (string | ImageType)[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Project = ({ pageInfo, markdown }: Props) => {
  return (
    <article className={styles.article}>
      <BigHeading title={pageInfo.title} subtitle={pageInfo.description} className={styles.heading} />
      <Tags tags={pageInfo.tags} />
      <section className={styles.imageContainer}>
        <Image
          alt={pageInfo.title + 'hero image'}
          src={pageInfo.cover.image.src}
          width={pageInfo.cover.image.width}
          height={pageInfo.cover.image.height}
          layout="responsive"
          placeholder="blur"
          blurDataURL={pageInfo.cover.base64}
        />
      </section>
      <section className={styles.content}>
        <Markdown md={markdown} />
      </section>
    </article>
  )
}

export default Project
