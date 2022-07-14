import notion from '@custom-utils/useNotion'
import { NotionPage } from '@custom-types/notion'
import { Card } from '@components/notion'
import { Grid } from '@components/notion'

type Props = {
  projects: NotionPage[]
}

const AllProjects = ({ projects }: Props) => {
  return (
    <Grid>
      {projects.map((proj: NotionPage) => (
        <Card
          key={proj.id}
          title={proj.title}
          image={proj.cover}
          description={proj.description}
          date={proj.date}
          tags={proj.tags}
          slug={proj.slug}
        />
      ))}
    </Grid>
  )
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
