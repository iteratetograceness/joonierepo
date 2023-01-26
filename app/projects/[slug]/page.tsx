import { getProjectBySlug } from '~/contentful';

import { SimpleHero } from '~/components/common/simple-hero';
import { RichText } from '~/components/contentful/rich-text';

export default async function Project({
  params,
}: {
  params: Record<string, string>;
}) {
  const project = await getProjectBySlug(params.slug);

  return (
    <article>
      <SimpleHero
        heading={project.title}
        subheading={project.description}
        italics={[5]}
      />
      <RichText content={project.content} />
    </article>
  );
}
