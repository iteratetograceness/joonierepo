import { NotionPage } from '@customtypes/notion'
import { BigHeading } from '@components/notion'
import * as styles from './styles'
import Image from 'next/image'

type Props = {
  work: NotionPage
}

const Project = ({ work }: Props) => {
  return (
    <section role="article" className={styles.article}>
      <BigHeading title={work.title} subtitle={work.description} className={styles.heading} />
      <div className={styles.imageContainer}>
        <div className={styles.leftImage}>
          <Image
            alt={`Main image for ${work.title}`}
            src={work.cover}
            width={700}
            height={375}
            layout="responsive"
            priority
          />
        </div>
        <div className={styles.rightImage}>
          <Image
            alt={`Main image for ${work.title}`}
            src={work.cover}
            width={700}
            height={375}
            layout="responsive"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default Project
