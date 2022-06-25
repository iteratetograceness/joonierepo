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
      <div className={styles.imgContainer}>
        <Image
          src={image.image}
          alt={image.caption}
          // width={700}
          // height={700}
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: '1.5rem 1.5rem 0 0' }}
        />
      </div>
      <div className={styles.cardText}>
        <h1>{title}</h1>
        {description}
        {date}
        {tags.map(tag => tag.name)}
        {slug}
      </div>
    </div>
  )
}

export default Card
