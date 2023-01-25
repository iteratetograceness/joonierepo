import { SimpleHero } from '~/components/common/simple-hero';
import { PageWrapper } from '~/components/common/page-wrapper';

export default function Projects() {
  return (
    <PageWrapper>
      <SimpleHero
        heading='Projects'
        italics={[1]}
        subheading='A collection of my work.'
      />
    </PageWrapper>
  );
}
