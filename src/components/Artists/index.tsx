import { Container } from '@/components/Container';
import SpotLight from '@/components/SpotLight';
import HeroCarouselLayout from '../Layouts/HeroCarouselLayout';
import PopularArtists from '../PopularArtists';
import { PanelsWrapper } from './FilterPanels';
import LaunchACollection from '../CTAs/LaunchACollection';

export default function Artists() {
  return (
    <div className='h-full bg-ob-black-light'>
      <HeroCarouselLayout
        title='Artists'
        description='Browse through our curated Artists'
        buttons={[
          { text: 'View All', link: '' },
          { text: 'Search', link: '' }
        ]}
      />

      <Container bgColor='bg-ob-black' padding>
        <SpotLight type='artist' slug='keegan' />
      </Container>

      <PopularArtists />

      <PanelsWrapper />

      <LaunchACollection />
    </div>
  );
}
