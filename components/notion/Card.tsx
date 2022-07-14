import Button from '@components/common/Button'
import RotateText from '@components/homepage/RotateText'
import { Image as ImageType, Tag } from '@custom-types/notion'
import Image from 'next/image'
import Link from 'next/link'
import * as styles from './styles'
import Tags from './Tags'

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
    <>
      <Link href={`/work/${slug}`}>
        <div className={styles.cardContainer}>
          <div className={styles.image}>
            <Image width={1920} height={700} src={image.image} alt={image.caption} layout="responsive" />
          </div>
          <Tags tags={tags} />
          <div className={styles.cardTitle}>
            <RotateText text={title.toUpperCase()} />
            <div className={styles.cardInformation}>
              <div className={styles.cardText}>
                {description} — {new Date(date).toDateString()}
              </div>
              <Button text="Read More" href={`/work/${slug}`} variant="outline" className="left-0" animation />
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Card
