import notion from '@custom-utils/useNotion'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Project } from '@components/work'
import { NotionPage, Image } from '@custom-types/notion'

interface IParams extends ParsedUrlQuery {
  slug: string
}

type Props = {
  pageInfo: NotionPage
  markdown: (string | Image)[]
}

const ProjectPage = ({ pageInfo, markdown }: Props) => <Project pageInfo={pageInfo} markdown={markdown} />

export default ProjectPage

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams

  try {
    const results = await notion.getPage(slug, 'work')

    if (!results) throw 'No post found.'

    return {
      props: {
        markdown: results.markdown,
        pageInfo: results.pageInfo,
      },
    }
  } catch (err) {
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  const posts = await notion.getAllPages('work')

  if (!posts) throw '>> No paths found while generating static paths for /work/[slug].'

  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
