import { Suspense } from 'react';
import { SimpleHero } from '~/components/common/simple-hero';
import { PageWrapper } from '~/components/common/page-wrapper';
import { getAllProjects } from '~/contentful';
import { CollectionList } from '~/components/common/collection-list';

export default async function Projects() {
  const projects = await getAllProjects();

  return (
    <PageWrapper>
      <SimpleHero
        heading='Projects'
        italics={[1]}
        subheading='A collection of my work.'
      />
      <Suspense fallback={<p>Loading feed...</p>}>
        <CollectionList collection={projects} type='project' />
      </Suspense>
    </PageWrapper>
  );
}
