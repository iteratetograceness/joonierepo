import { NotionPage } from '@customtypes/notion'
import { BigHeading } from '@components/notion'
import * as styles from './styles'
import Image from 'next/image'

type Props = {
  pageInfo: NotionPage
  images: string[]
  markdown: string
}

const Project = ({ pageInfo, images, markdown }: Props) => {
  console.log(markdown)
  return (
    <section role="article" className={styles.article}>
      <BigHeading title={pageInfo.title} subtitle={pageInfo.description} className={styles.heading} />
      <div className={styles.imageContainer}>
        <Image
          alt={`Main image for ${pageInfo.title}`}
          src={images[0]}
          width={1640}
          height={664}
          layout="responsive"
          priority
        />
      </div>
    </section>
  )
}

export default Project
