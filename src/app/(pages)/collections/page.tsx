import { Container } from '@/components/Container';
import { LaunchACollection } from '@/components/CTAs';
import PopularCollections from '@/components/PopularCollections';
import SpotLight from '@/components/SpotLight';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className='h-full w-screen bg-ob-black-light'>
      <Container>
        <div className='flex h-[90vh] w-full flex-col items-center justify-center py-8'>
          <div className='flex h-full w-1/2 flex-col items-center justify-center gap-8 bg-ob-black-light'>
            <h1 className='font-bold'>Collections</h1>
            <span className='text-center text-lg font-thin text-ob-grey-lightest'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam.
            </span>
            <div className='flex flex-row justify-between gap-8'>
              <Button variant='secondary'>View All</Button>
              <Button>Search</Button>
            </div>
          </div>
          <div>
            <h2>Carousel</h2>
          </div>
        </div>
      </Container>

      <Container bgColor='bg-ob-black' padding>
        <SpotLight type='collection' slug='lone-aliens' />
      </Container>

      <PopularCollections />

      <LaunchACollection />
    </div>
  );
}
