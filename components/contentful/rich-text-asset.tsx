import Image from 'next/image';
import { EmbeddedAsset } from '~/contentful/types';

interface Props {
  id: string;
  assets: EmbeddedAsset[];
}

export default function RichTextAsset({ id, assets }: Props) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return (
      <Image src={asset.url} width={500} height={500} alt={asset.description} />
    );
  }

  return null;
}
