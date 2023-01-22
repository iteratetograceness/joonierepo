import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styles from './index.module.css';

const MARKDOWN = [
  '**Full stack** engineer. **NYU** Gallatin Graduate. Building a more **accessible** web. Currently on the Growth team at **Vercel**. Crafting data-based experiments & features to drive revenue and retention. Previously on the desktop and web app teams at **NZXT**.',
  'Portrait **photography** hobbyist. Sporadic **doodler**. Cozy Switch game enthusiast. Currently waiting patiently for the release of Octopath Traveler 2.',
  `**${new Date().getFullYear()}**`,
];
const ILLUSTRATIONS = [
  { src: '/vercel_growth_team.svg', alt: '' },
  { src: '/nzxt_ecommerce.svg', alt: '' },
  { src: '/doodling_with_cooper.svg', alt: '' },
];

export function TextAndIllustrations() {
  return (
    <div className={styles.grid}>
      {MARKDOWN.map((text, i) => (
        <ReactMarkdown key={`${text}-${i}`}>{text}</ReactMarkdown>
      ))}
      {ILLUSTRATIONS.map(({ src, alt }, i) => (
        <div
          key={`${src}-${i}`}
          className={styles['image-container']}
          style={{ gridArea: `image-${i + 1}` }}
        >
          <div className={styles['inner-image-container']}>
            <Image src={src} alt={alt} fill />
          </div>
        </div>
      ))}
    </div>
  );
}
