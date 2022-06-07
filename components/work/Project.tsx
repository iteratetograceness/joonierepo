import { NotionPage } from '@customtypes/notion'
import { BigHeading } from '@components/notion'
import * as styles from './styles'
import Image from 'next/image'

type Props = {
  pageInfo: NotionPage
  images: [{ src: string; width: number; height: number; type: string }, string][]
  captions: string[]
  markdown: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Project = ({ pageInfo, images, captions, markdown }: Props) => {
  return (
    <section role="article" className={styles.article}>
      <BigHeading title={pageInfo.title} subtitle={pageInfo.description} className={styles.heading} />
      <div className={styles.imageContainer}>
        <Image
          alt={captions[0]}
          src={images[0][0]['src']}
          width={images[0][0]['width']}
          height={images[0][0]['height']}
          layout="responsive"
          placeholder="blur"
          blurDataURL={images[0][1]}
        />
      </div>
    </section>
  )
}

export default Project
