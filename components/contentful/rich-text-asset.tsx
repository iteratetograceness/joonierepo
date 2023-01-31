import Image from 'next/image';
import { EmbeddedAsset } from '~/contentful/types';
import styles from './index.module.css';

interface Props {
  id: string;
  assets: EmbeddedAsset[];
}

export default function RichTextAsset({ id, assets }: Props) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return (
      <div
        style={{ aspectRatio: asset.width / asset.height }}
        className={styles['image-container']}
      >
        {asset.contentType === 'video/mp4' ? (
          <>
            <video
              controls
              muted
              src={asset.url}
              aria-describedby='video-description'
            />
            <p id='video-description' className={styles['video-description']}>
              {asset.description}
            </p>
          </>
        ) : (
          <Image src={asset.url} fill alt={asset.description} />
        )}
      </div>
    );
  }

  return null;
}
