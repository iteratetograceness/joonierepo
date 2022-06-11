import Notion from '@custom-utils/useNotion'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Project } from '@components/work'
import { NotionPage, Image } from '@custom-types/notion'

interface IParams extends ParsedUrlQuery {
  slug: string
}

type Props = {
  pageInfo: NotionPage
  images: { image: Image; base64: string; caption: string }[]
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

  try {
    const results = await db.getPage(slug, 'work')

    if (!results) throw 'No post found.'

    return {
      props: {
        images: results.images,
        markdown: results.markdown,
        pageInfo: results.pageInfo,
      },
    }
  } catch (err) {
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  const db = new Notion()

  const posts = await db.getAllPages('work')

  if (!posts) throw '>> No paths found while generating static paths for /work/[slug].'

  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
