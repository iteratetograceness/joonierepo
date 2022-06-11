/* eslint-disable react/no-children-prop */
import { NotionPage, Image as ImageType } from '@customtypes/notion'
import { BigHeading } from '@components/notion'
import * as styles from './styles'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Tags from '@components/notion/Tags'

type Props = {
  pageInfo: NotionPage
  images: ImageType[]
  markdown: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Project = ({ pageInfo, images, markdown }: Props) => {
  const [hero, firstImg, secondImg] = images

  console.log(firstImg === secondImg)

  return (
    <article className={styles.article}>
      <BigHeading title={pageInfo.title} subtitle={pageInfo.description} className={styles.heading} />
      <Tags tags={pageInfo.tags} />
      <section className={styles.imageContainer}>
        <Image
          alt={hero.caption}
          src={hero.image.src}
          width={hero.image.width}
          height={hero.image.height}
          layout="responsive"
          placeholder="blur"
          blurDataURL={hero.base64}
        />
      </section>
      <section className={styles.markdown}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </section>
    </article>
  )
}

export default Project
