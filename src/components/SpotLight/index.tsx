import { ArtistSpotLight } from './ArtistSpotLight';
import { CollectionSpotLight } from './CollectionSpotLight';

export default function SpotLight({ type, slug }: { type: 'collection' | 'artist'; slug: string }) {
  if (type === 'collection') {
    return <CollectionSpotLight slug={slug} />;
  } else if (type === 'artist') {
    return <ArtistSpotLight slug={slug} />;
  } else {
    return null;
  }
}
