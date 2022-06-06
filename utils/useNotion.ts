import { Client } from '@notionhq/client'
import { NotionPage, BlockObjectResponse } from '@customtypes/notion'

export default class Notion {
  client: Client

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static convertBlocksToMarkdown(blocks: BlockObjectResponse[]): any {
    let data = ''
    const images = []

    for (const block of blocks) {
      switch (block.type) {
        case 'paragraph':
          let paragraph = ''
          let chunks = ''
          for (const text of block.paragraph.rich_text) {
            if (text.href) chunks = `[${text.plain_text}](${text.href})`
            else chunks = text.plain_text

            if (text.bold) chunks = '**' + chunks + '**'
            if (text.italic) chunks = '*' + chunks + '*'
            if (text.strikethrough) chunks = '~~' + chunks + '~~'
            if (text.code) chunks += '`' + chunks + '`'

            paragraph += chunks
          }
          data += paragraph
          break
        // add heading 1 and 2
        case 'heading_3':
          const text = block.heading_3.rich_text[0]
          let headingThree = ''

          if (text.href) headingThree = `[${text.plain_text}](${text.href})`
          else headingThree = text.plain_text

          if (text.bold) headingThree = '**' + headingThree + '**'
          if (text.italic) headingThree = '*' + headingThree + '*'
          if (text.strikethrough) headingThree = '~~' + headingThree + '~~'
          if (text.code) headingThree += '`' + headingThree + '`'

          data += headingThree
          break
        case 'image':
          console.log(block.image)
          if ('file' in block.image) images.push(block.image.file.url)
          break
        case 'bulleted_list_item':
          let listItem = ''
          for (const text of block.bulleted_list_item.rich_text) {
            let markdown = ''
            if (text.href) markdown = `[${text.plain_text}](${text.href})`
            else markdown = text.plain_text

            if (text.bold) markdown = '**' + markdown + '**'
            if (text.italic) markdown = '*' + markdown + '*'
            if (text.strikethrough) markdown = '~~' + markdown + '~~'
            if (text.code) markdown += '`' + markdown + '`'

            listItem += '* ' + markdown
          }
          data += listItem
          break
        case 'to_do':
          let todo = ''
          for (const text of block.to_do.rich_text) {
            let markdown = ''
            if (text.href) markdown = `[${text.plain_text}](${text.href})`
            else markdown = text.plain_text

            if (text.bold) markdown = '**' + markdown + '**'
            if (text.italic) markdown = '*' + markdown + '*'
            if (text.strikethrough) markdown = '~~' + markdown + '~~'
            if (text.code) markdown += '`' + markdown + '`'

            todo += markdown
          }
          data += '[] ' + todo
          break
        default:
          throw Error('Invalid block type.')
      }
    }

    return { data, images }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static convertPageToPostPreview(page: any): NotionPage {
    let cover = page.cover || ''

    switch (cover.type) {
      case 'file':
        cover = page.cover.file.url
        break
      case 'external':
        cover = page.cover.external.url
        break
      default:
        // Add a default cover
        cover = ''
    }

    return {
      id: page.id,
      cover: cover,
      title: page.properties.Title.title[0].plain_text,
      tags: page.properties.Tags.multi_select,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Updated.last_edited_time,
      slug: page.properties.Slug.rich_text[0].plain_text,
    }
  }

  /**
   * Retrieves all pages in Notion Database
   * @param table blog or work
   * @returns NotionPage[]
   */
  async getAllPages(table: string): Promise<NotionPage[] | void> {
    let database_id

    switch (table) {
      case 'blog':
        database_id = process.env.NOTION_BLOG_DATABASE_ID
        break
      case 'work':
        database_id = process.env.NOTION_PROJECT_DATABASE_ID
        break
      default:
        database_id = null
    }

    if (database_id) {
      const res = await this.client.databases.query({
        database_id,
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: 'Updated',
            direction: 'descending',
          },
        ],
      })

      return res.results.map(proj => Notion.convertPageToPostPreview(proj))
    } else console.warn(`>> Missing ${table} database ID.`)
  }

  // stronger typing for return obh
  async getPage(
    slug: string,
    table: string
  ): Promise<{ markdown: string; images: string[]; pageInfo: NotionPage } | undefined> {
    let database_id

    switch (table) {
      case 'blog':
        database_id = process.env.NOTION_BLOG_DATABASE_ID
        break
      case 'work':
        database_id = process.env.NOTION_PROJECT_DATABASE_ID
        break
      default:
        database_id = null
    }

    if (database_id) {
      const res = await this.client.databases.query({
        database_id,
        filter: {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
      })

      if (!res.results[0]) throw `Entry with slug ${slug} not found.`

      const results = res.results[0]
      const page = await this.client.blocks.children.list({ block_id: results.id })
      const { data, images } = Notion.convertBlocksToMarkdown(page.results as BlockObjectResponse[]) || ''
      const pageInfo = Notion.convertPageToPostPreview(results) || {}
      return { markdown: data, images, pageInfo }
    }
  }
}
