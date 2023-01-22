import { About } from '../components/homepage/about';
import { PageWrapper } from '../components/common/page-wrapper';
import { HomepageHero } from '../components/homepage/hero';

export default function Home() {
  return (
    <PageWrapper>
      <HomepageHero />
      <About />
    </PageWrapper>
  );
}
