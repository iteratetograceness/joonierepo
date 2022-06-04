export type Tag = {
  color: string
  id: string
  name: string
}

export type NotionPage = {
  id: string
  slug: string
  cover: string
  title: string
  tags: Tag[]
  description: string
  date: string
}

export type BlockObjectResponse =
  | {
      type: 'paragraph'
      paragraph: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'heading_1'
      heading_1: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'heading_2'
      heading_2: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'heading_3'
      heading_3: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'bulleted_list_item'
      bulleted_list_item: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'numbered_list_item'
      numbered_list_item: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'quote'
      quote: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'to_do'
      to_do: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
        checked: boolean
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'toggle'
      toggle: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'template'
      template: {
        rich_text: Array<RichTextItemResponse>
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'synced_block'
      synced_block: {
        synced_from: {
          type: 'block_id'
          block_id: IdRequest
        } | null
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'child_page'
      child_page: {
        title: string
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'child_database'
      child_database: {
        title: string
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'equation'
      equation: {
        expression: string
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'code'
      code: {
        rich_text: Array<RichTextItemResponse>
        caption: Array<RichTextItemResponse>
        language: LanguageRequest
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'callout'
      callout: {
        rich_text: Array<RichTextItemResponse>
        color: ApiColor
        icon:
          | {
              type: 'emoji'
              emoji: EmojiRequest
            }
          | null
          | {
              type: 'external'
              external: {
                url: TextRequest
              }
            }
          | null
          | {
              type: 'file'
              file: {
                url: string
                expiry_time: string
              }
            }
          | null
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'divider'
      divider: EmptyObject
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'breadcrumb'
      breadcrumb: EmptyObject
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'table_of_contents'
      table_of_contents: {
        color: ApiColor
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'column_list'
      column_list: EmptyObject
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'column'
      column: EmptyObject
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'link_to_page'
      link_to_page:
        | {
            type: 'page_id'
            page_id: IdRequest
          }
        | {
            type: 'database_id'
            database_id: IdRequest
          }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'table'
      table: {
        has_column_header: boolean
        has_row_header: boolean
        table_width: number
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'table_row'
      table_row: {
        cells: Array<Array<RichTextItemResponse>>
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'embed'
      embed: {
        url: string
        caption: Array<RichTextItemResponse>
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'bookmark'
      bookmark: {
        url: string
        caption: Array<RichTextItemResponse>
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'image'
      image:
        | {
            type: 'external'
            external: {
              url: TextRequest
            }
            caption: Array<RichTextItemResponse>
          }
        | {
            type: 'file'
            file: {
              url: string
              expiry_time: string
            }
            caption: Array<RichTextItemResponse>
          }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'video'
      video:
        | {
            type: 'external'
            external: {
              url: TextRequest
            }
            caption: Array<RichTextItemResponse>
          }
        | {
            type: 'file'
            file: {
              url: string
              expiry_time: string
            }
            caption: Array<RichTextItemResponse>
          }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'pdf'
      pdf:
        | {
            type: 'external'
            external: {
              url: TextRequest
            }
            caption: Array<RichTextItemResponse>
          }
        | {
            type: 'file'
            file: {
              url: string
              expiry_time: string
            }
            caption: Array<RichTextItemResponse>
          }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'file'
      file:
        | {
            type: 'external'
            external: {
              url: TextRequest
            }
            caption: Array<RichTextItemResponse>
          }
        | {
            type: 'file'
            file: {
              url: string
              expiry_time: string
            }
            caption: Array<RichTextItemResponse>
          }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'audio'
      audio:
        | {
            type: 'external'
            external: {
              url: TextRequest
            }
            caption: Array<RichTextItemResponse>
          }
        | {
            type: 'file'
            file: {
              url: string
              expiry_time: string
            }
            caption: Array<RichTextItemResponse>
          }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'link_preview'
      link_preview: {
        url: TextRequest
      }
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
  | {
      type: 'unsupported'
      unsupported: EmptyObject
      object: 'block'
      id: string
      created_time: string
      created_by: {
        id: IdRequest
        object: 'user'
      }
      last_edited_time: string
      last_edited_by: {
        id: IdRequest
        object: 'user'
      }
      has_children: boolean
      archived: boolean
    }
