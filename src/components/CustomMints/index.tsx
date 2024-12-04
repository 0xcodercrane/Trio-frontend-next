import NotFound from '@/app/not-found';
import Section from '../Section';
import SpartacusMint from './SpartacusMint';

export default function CustomMints({ id }: { id: string }) {
  switch (id) {
    case 'spartacus':
      return <SpartacusMint />;
    default:
      return <NotFound />;
  }
}
