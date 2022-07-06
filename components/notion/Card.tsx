import RotateText from '@components/homepage/RotateText'
import { Image as ImageType, Tag } from '@custom-types/notion'
import Image from 'next/image'
import { useState } from 'react'
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
  const [isHovering, setIsHovering] = useState(false)

  // TODO: follow mouse position and set position of image on hover
  // https://bobbyhadz.com/blog/react-get-mouse-position

  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div className={styles.image}>
          <Image
            width={700}
            height={700}
            src={image.image}
            alt={image.caption}
            layout="fill"
            objectFit="cover"
            objectPosition="99%"
            style={{ borderRadius: '100%' }}
          />
        </div>
      )}
      <RotateText text={title.toUpperCase()} />
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
