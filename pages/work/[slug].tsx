import Notion from '@utils/useNotion'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Project } from '@components/work'
import { NotionPage } from '@customtypes/notion'
interface IParams extends ParsedUrlQuery {
  slug: string
}

type Props = {
  post: NotionPage
}

const ProjectPage = ({ post }: Props) => {
  return (
    <>
      <Project work={post}/>
    </>
  )
}

export default ProjectPage

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const db = new Notion()
  const post = await db.getPage(slug, 'work')

  if (!post) throw 'No post found.'

  return {
    props: {
      post,
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
