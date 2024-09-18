import Artist from '@/components/Artist';

export default function Page({ params }: { params: { slug: string } }) {
  return <Artist slug={params.slug} />;
}
