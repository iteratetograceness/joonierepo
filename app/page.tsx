import HomepageHero from '../components/home/hero';
import inter from '../utils/inter';
import SubSection, {
  Props as SectionProps,
} from '../components/home/subsection';
// import styles from './page.module.css';

const ILLUSTRATIONS: SectionProps[] = [
  {
    illustration: 'self_portrait_with_cooper.png',
    alt: 'A self-portrait illustration of Jueun Grace Yun and her cockapoo Cooper.',
    caption: 'Hi, I’m Grace. I’m a software engineer based in New Jersey.',
    underlineIndexes: [2],
    underlineColors: ['#9CABD2'],
  },
  {
    illustration: 'vercel_growth_team.png',
    alt: 'A self-portrait illustration of Jueun Grace Yun working on a Macbook and an arrow pointing up.',
    caption:
      'I work on the Growth team at Vercel where I develop and implement data-based experiments + features to drive revenue and retention.',
    underlineIndexes: [7],
    underlineColors: ['#F5ACA8'],
  },
  {
    illustration: 'nzxt_ecommerce.png',
    alt: 'A self-portrait illustration of Jueun Grace Yun next to the NZXT website and other e-commerce motifs such as a shopping cart.',
    caption:
      'Previously, I worked in the e-commerce space at NZXT as a frontend engineer.',
    underlineIndexes: [8],
    underlineColors: ['#F4BB65'],
  },
  {
    illustration: 'doodling_with_cooper.png',
    alt: 'A self-portrait illustration of Jueun Grace Yun laying on the ground with her iPad next to her cockapoo Cooper.',
    caption:
      'Beyond work, I like to doodle, play board games, and patiently wait for the release of Octopath Traveler 2.',
  },
];

export default function Home() {
  return (
    <div className={inter.className}>
      <HomepageHero />
      {ILLUSTRATIONS.map((i: SectionProps, idx) => (
        <SubSection
          {...i}
          key={i.alt}
          reverse={idx % 2 !== 0 ? true : false}
          isLastIndex={ILLUSTRATIONS.length - 1 == idx ? true : false}
        />
      ))}
    </div>
  );
}
