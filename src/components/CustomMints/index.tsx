import NotFound from '@/app/not-found';
import SpartacusMint from './SpartacusMint';

export enum ECustomMints {
  Spartacus = 'spartacus'
}

export const CustomMintValues = Object.values(ECustomMints);

export default function CustomMints({ id }: { id: string }) {
  switch (id) {
    case 'spartacus':
      return <SpartacusMint />;
    default:
      return <NotFound />;
  }
}
