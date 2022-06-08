import Notion from '@utils/useNotion'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Project } from '@components/work'
import { NotionPage } from '@customtypes/notion'
import { getPlaiceholder } from 'plaiceholder'
interface IParams extends ParsedUrlQuery {
  slug: string
}

type Props = {
  pageInfo: NotionPage
  images: [{ src: string; width: number; height: number; type: string; caption: string[] }, string][]
  captions: string[]
  markdown: string
}

const ProjectPage = ({ pageInfo, images, captions, markdown }: Props) => {
  return (
    <>
      <Project pageInfo={pageInfo} images={images} captions={captions} markdown={markdown} />
    </>
  )
}

export default ProjectPage

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as IParams
  const db = new Notion()
  const results = await db.getPage(slug, 'work')
  const images = []

  if (!results) throw 'No post found.'

  for (const image of results.images) {
    const { base64, img } = await getPlaiceholder(image, { size: 10 })
    images.push([img, base64])
  }

  return {
    props: {
      images,
      captions: results.captions,
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
