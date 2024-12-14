import CustomMints, { CustomMintValues, ECustomMints } from '@/components/CustomMints';
import Mint from '@/components/Mint';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (CustomMintValues.includes(id as ECustomMints)) {
    return <CustomMints id={id} />;
  } else {
    return <Mint id={id} />;
  }
}
