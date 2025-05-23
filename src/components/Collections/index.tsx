import { PanelsWrapper } from '@/components/Collections/FilterPanels';
import { Container } from '@/components/Container';
import { LaunchACollection } from '@/components/CTAs';
import SpotLight from '@/components/SpotLight';
import { NETWORK, SPOTLIGHT_COLLECTION_SLUG } from '@/lib/constants';
import { LatestTrades } from '../LatestTrades';

export default function Collections() {
  return (
    <div className='h-full w-screen bg-ob-purple-dark'>
      {/* <Container>
        <HomeCarouselLayout
          title='Collections'
          description='Browse through our curated collections'
          buttons={[
            { text: 'View All', link: '' },
            { text: 'Search', link: '' }
          ]}
        />
      </Container> */}

      <Container bgColor='bg-ob-purple-darkest' className='mt-8' padding>
        <SpotLight type='collection' slug={SPOTLIGHT_COLLECTION_SLUG[NETWORK]} />
      </Container>

      <Container bgColor='bg-ob-purple-darkest' padding>
        <LatestTrades />
      </Container>

      <PanelsWrapper />

      {/* <PopularCollections /> */}

      <LaunchACollection />
    </div>
  );
}
