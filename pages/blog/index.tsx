import notion from '@custom-utils/useNotion'
import { NotionPage } from '@custom-types/notion'
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
  const posts = await notion.getAllPages('blog')

  return {
    props: {
      posts,
    },
  }
}
