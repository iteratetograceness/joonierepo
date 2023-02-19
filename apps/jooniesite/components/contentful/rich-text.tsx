import { RichTextContent } from '~/contentful/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import RichTextAsset from '~/components/contentful/rich-text-asset';
import { BLOCKS, Node } from '@contentful/rich-text-types';
import styles from './index.module.css';

export function RichText({ content }: { content: RichTextContent }) {
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
    <section className={styles['content-container']}>
      {documentToReactComponents(content.json, customMarkdownOptions(content))}
    </section>
  );
}
