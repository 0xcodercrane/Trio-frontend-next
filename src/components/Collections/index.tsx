import { PanelsWrapper } from '@/components/Collections/FilterPanels';
import { Container } from '@/components/Container';
import { LaunchACollection } from '@/components/CTAs';
import PopularCollections from '@/components/PopularCollections';
import SpotLight from '@/components/SpotLight';
import HomeCarouselLayout from '../Layouts/HeroCarouselLayout';
export default function Collections() {
  return (
    <div className='bg-ob-purple-dark h-full w-screen'>
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

      <Container bgColor='bg-ob-purple-darkest' padding>
        <SpotLight type='collection' slug='underground-fragments' />
      </Container>

      <PanelsWrapper />

      {/* <PopularCollections /> */}

      <LaunchACollection />
    </div>
  );
}
