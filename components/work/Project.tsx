/* eslint-disable react/no-children-prop */
import { NotionPage } from '@customtypes/notion'
import { BigHeading } from '@components/notion'
import * as styles from './styles'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Tags from '@components/notion/Tags'

type Props = {
  pageInfo: NotionPage
  images: [{ src: string; width: number; height: number; type: string }, string][]
  captions: string[]
  markdown: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Project = ({ pageInfo, images, captions, markdown }: Props) => {
  return (
    <article className={styles.article}>
      <BigHeading title={pageInfo.title} subtitle={pageInfo.description} className={styles.heading} />
      <Tags tags={pageInfo.tags} />
      <section className={styles.imageContainer}>
        <Image
          alt={captions[0]}
          src={images[0][0]['src']}
          width={images[0][0]['width']}
          height={images[0][0]['height']}
          layout="responsive"
          placeholder="blur"
          blurDataURL={images[0][1]}
        />
      </section>
      <section className={styles.markdown}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </section>
    </article>
  )
}

export default Project
