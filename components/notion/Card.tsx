import RotateText from '@components/homepage/RotateText'
import { Image as ImageType, Tag } from '@custom-types/notion'
import Image from 'next/image'
import * as styles from './styles'

type Props = {
  title: string
  image: ImageType
  description: string
  date: string
  tags: Tag[]
  slug: string
}

const Card = ({ title, image, description, date, tags, slug }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.image}>
        <Image width={1920} height={700} src={image.image} alt={image.caption} objectPosition="99%" />
      </div>
      <div className={styles.cardTitle}>
        <RotateText text={title.toUpperCase()} />
      </div>

      <div className={styles.cardText}>
        {description}
        {date}
        {tags.map(tag => tag.name)}
        {slug}
      </div>
    </div>
  )
}

export default Card
