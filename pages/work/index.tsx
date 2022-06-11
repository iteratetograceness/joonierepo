import notion from '@custom-utils/useNotion'
import { NotionPage } from '@custom-types/notion'

type Props = {
  projects: NotionPage[]
}

const AllProjects = ({ projects }: Props) => {
  return <p> {projects.length} </p>
}

export default AllProjects

export async function getStaticProps() {
  const projects = await notion.getAllPages('work')

  return {
    props: {
      projects,
    },
  }
}
