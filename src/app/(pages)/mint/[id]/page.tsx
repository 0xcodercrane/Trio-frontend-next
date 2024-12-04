import CustomMints from '@/components/CustomMints';
import Mint from '@/components/Mint';

export default function Page({ params }: { params: { id: number | string } }) {
  const { id } = params;

  // If the param is a string, then we're dealing with a custom mint
  if (typeof id === 'string') {
    return <CustomMints id={id} />;
  } else {
    return <Mint id={id} />;
  }
}
