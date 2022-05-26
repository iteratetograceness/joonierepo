import { Client } from '@notionhq/client'
import { NotionPage } from '@customtypes/notion'

export default class Notion {
  client: Client

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static convertPageToFullPost(page: any): any {
    
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static convertPageToPostPreview(page: any): NotionPage {
    let cover = page.cover
    switch (cover) {
      case 'file':
        cover = page.cover.file
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
  async getPage(slug: string, table: string): Promise<unknown> {
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

      const pageInfo = res.results[0]
      const page = await this.client.blocks.children.list({ block_id: pageInfo.id })
      console.log(page)
      return Notion.convertPageToPostPreview(pageInfo)
    }
  }
}
