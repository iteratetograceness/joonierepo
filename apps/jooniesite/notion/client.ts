import { Client } from '@notionhq/client';

export class Notion {
  client: Client;

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_TOKEN });
  }

  async getDatabase(database_id: string) {
    try {
      const { results } = await this.client.databases.query({ database_id });

      if (!results.length) {
        // HANDLE NO RESULTS
      }

      console.log(results[0]);

      return results;
    } catch (error) {
      // HANDLE ERROR
    }
  }
}
