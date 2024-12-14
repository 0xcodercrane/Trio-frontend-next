import { SplashPageLayout } from '@/components/Layouts';
import { MintComponent } from './MintComponent';

const SPARTACUS_IMG = '/img/custom-mints/spartacus/spartacus.png';

export default function SpartacusMint() {
  return (
    <SplashPageLayout media={{ src: SPARTACUS_IMG, type: 'img' }} className='px-12 py-[--section-vertical-padding]'>
      <MintComponent />
    </SplashPageLayout>
  );
}
