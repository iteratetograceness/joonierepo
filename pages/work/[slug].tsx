import Notion from '@utils/useNotion'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Project } from '@components/work'
import { NotionPage } from '@customtypes/notion'
interface IParams extends ParsedUrlQuery {
  slug: string
}

type Props = {
  pageInfo: NotionPage
  images: string[]
  markdown: string
}

const ProjectPage = ({ pageInfo, images, markdown }: Props) => {
  return (
    <>
      <Project pageInfo={pageInfo} images={images} markdown={markdown} />
    </>
  )
}

export default ProjectPage

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const db = new Notion()
  const results = await db.getPage(slug, 'work')

  if (!results) throw 'No post found.'

  console.log(results.images)

  return {
    props: {
      images: results.images,
      markdown: results.markdown,
      pageInfo: results.pageInfo,
    },
  }
}

export async function getStaticPaths() {
  const db = new Notion()
  const posts = await db.getAllPages('work')

  if (!posts) throw 'No posts found.'

  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
