import { NotionPage } from '@customtypes/notion'
import Title from './Title'

type Props = {
  work: NotionPage
}

const Project = ({ work }: Props) => {
  return <Title title={work.title} />
}

export default Project
