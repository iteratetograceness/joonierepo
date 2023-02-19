import { WorkInProgress } from '~/components/common/wip';
import { notion } from '~/notion/use-notion';

async function getDatabaseData(id: string) {
  const data = await notion.getDatabase(id);
  return data;
}

export default async function Bookmarks() {
  if (!process.env.NOTION_BOOKMARKS_DB_ID) {
    return <WorkInProgress />;
  }

  const data = await getDatabaseData(process.env.NOTION_BOOKMARKS_DB_ID);

  return <p>bookmarks</p>;
}

// https://www.notion.so/graceyun/2b3c9e4101ed4e7485f881f19e095b69?v=4d599bd44a574acf88f48256a839f030
