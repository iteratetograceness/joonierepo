export enum TagColor {
  NEXTJS = 'green', // map to taiilwind theme colors
  GRAPHQL = 'blue',
}

export type Tag = {
  color: TagColor
  id: string
  name: string
}

export type BlogPost = {
  id: string
  slug: string
  cover: string
  title: string
  tags: Tag[]
  description: string
  date: string
}
