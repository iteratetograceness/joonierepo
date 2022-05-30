import Notion from '@utils/useNotion'
import { NotionPage } from '@customtypes/notion'
import { GetStaticProps } from 'next'

type Props = {
  posts: NotionPage[]
}

const AllPosts = ({ posts }: Props) => {
  return (
    <>
      {posts.map(post => (
        <p key={post.slug}>{post.title}</p>
      ))}
    </>
  )
}

export default AllPosts

export const getStaticProps: GetStaticProps = async () => {
  const db = new Notion()
  const posts = await db.getAllPages('blog')

  return {
    props: {
      posts,
    },
  }
}
