import NotFound from '@/app/not-found';

export enum ECustomMints {
  Spartacus = 'spartacus'
}

export const CustomMintValues = Object.values(ECustomMints);

export default function CustomMints({ slug }: { slug: string }) {
  switch (slug) {
    // return <SpartacusMint />;
    case 'spartacus':
    default:
      return <NotFound />;
  }
}
