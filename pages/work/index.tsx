import notion from '@custom-utils/useNotion'
import { NotionPage } from '@custom-types/notion'
import { Card } from '@components/notion'
import { Grid } from '@components/notion'

type Props = {
  projects: NotionPage[]
}
// {
//   id: '944cdfac-696c-47d7-950a-acb51bd2e221',
//   cover: {
//     image: [Object],
//     base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAIAAAAb/VE3AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAN0lEQVQImQEsANP/AP/z2P/74P/84v/z2YmEfsC6siQjIgD/9dr/89r/8Nf/+t1sZ2Gmo54AAADcwR2+fz5OYAAAAABJRU5ErkJggg==',
//     caption: ''
//   },
//   title: 'BeanBook',
//   tags: [ [Object], [Object], [Object] ],
//   description: 'A coffee tasting journal app',
//   date: '2022-06-11T21:06:00.000Z',
//   slug: 'beanbook'
// }
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
