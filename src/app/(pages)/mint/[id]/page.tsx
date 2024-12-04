import Mint from '@/components/Mint';

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  return <Mint id={id} />;
}
