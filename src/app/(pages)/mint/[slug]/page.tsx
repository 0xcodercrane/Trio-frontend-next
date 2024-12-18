import CustomMints, { CustomMintValues, ECustomMints } from '@/components/CustomMints';
import Mint from '@/components/Mint';

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (CustomMintValues.includes(slug as ECustomMints)) {
    return <CustomMints slug={slug} />;
  } else {
    return <Mint slug={slug} />;
  }
}
