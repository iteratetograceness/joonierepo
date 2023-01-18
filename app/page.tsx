import Link from 'next/link';
// import { ScrollerMotion } from 'scroller-motion';
import { PageWrapper } from '../components/common/page-wrapper';

export default function Home() {
  return (
    <PageWrapper>
      {/* <ScrollerMotion> */}
      <Link href='/projects'>hero</Link>
      {/* </ScrollerMotion> */}
    </PageWrapper>
  );
}
