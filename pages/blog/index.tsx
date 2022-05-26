import Notion from '@utils/useNotion'
import { NotionPage } from '@customtypes/notion'
import { GetStaticProps } from 'next'

type Props = {
  posts: NotionPage[]
}

const AllPosts = ({ posts }: Props) => <p>all posts</p>

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
