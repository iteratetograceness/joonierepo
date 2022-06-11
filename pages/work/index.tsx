import { GetStaticProps } from 'next'
import Notion from '@custom-utils/useNotion'
import { NotionPage } from '@custom-types/notion'

type Props = {
  projects: NotionPage[]
}

const AllProjects = ({ projects }: Props) => {
  return <p> {projects.length} </p>
}

export default AllProjects

export const getStaticProps: GetStaticProps = async () => {
  const db = new Notion()
  const projects = await db.getAllPages('work')

  return {
    props: {
      projects,
    },
  }
}
