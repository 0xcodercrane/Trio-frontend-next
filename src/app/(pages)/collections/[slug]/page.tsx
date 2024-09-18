import Collection from '@/components/Collection';

export default function Page({ params }: { params: { slug: string } }) {
  return <Collection slug={params.slug} />;
}
