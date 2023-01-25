import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import RichTextAsset from '~/components/contentful/rich-text-asset';
import { getProjectBySlug } from '~/contentful';
import { RichTextContent } from '~/contentful/types';
import { BLOCKS, Node } from '@contentful/rich-text-types';

export default async function Project({
  params,
}: {
  params: Record<string, string>;
}) {
  const { content } = await getProjectBySlug(params.slug);
  console.log(content.links.assets);
  const customMarkdownOptions = (content: RichTextContent) => ({
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
    },
  });

  return (
    <>
      {documentToReactComponents(content.json, customMarkdownOptions(content))}
    </>
  );
}
