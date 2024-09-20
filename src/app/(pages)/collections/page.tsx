import { Container } from '@/components/Container';
import { LaunchACollection } from '@/components/CTAs';
import SpotLight from '@/components/SpotLight';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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

      <Container bgColor='bg-ob-black' padding>
        <div className='flex flex-col py-24'>
          <div className='flex flex-row justify-between py-12'>
            <h3>Popular Categories</h3>
            <span>View all Collections (3)</span>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex h-[256px] min-h-[256px] flex-row'>
              <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
                <h3>On Sale</h3>
                <div className='flex flex-row items-center justify-between gap-4'>
                  <div className='flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ob-grey'>
                    <ChevronLeft color='white' size={30} />
                  </div>
                  <div className='flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ob-grey'>
                    <ChevronRight color='white' size={30} />
                  </div>
                </div>
              </div>
              <div className='flex h-full basis-5/6 flex-row gap-4'>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
              </div>
            </div>
            <div className='flex h-[256px] min-h-[256px] flex-row'>
              <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
                <h3>Trending</h3>
                <div className='flex flex-row items-center justify-between gap-4'>
                  <div className='flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ob-grey'>
                    <ChevronLeft color='white' size={30} />
                  </div>
                  <div className='flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ob-grey'>
                    <ChevronRight color='white' size={30} />
                  </div>
                </div>
              </div>
              <div className='flex h-full basis-5/6 flex-row gap-4'>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
              </div>
            </div>
            <div className='flex h-[256px] min-h-[256px] flex-row'>
              <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
                <h3>Movers</h3>
                <div className='flex flex-row items-center justify-between gap-4'>
                  <div className='flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ob-grey'>
                    <ChevronLeft color='white' size={30} />
                  </div>
                  <div className='flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ob-grey'>
                    <ChevronRight color='white' size={30} />
                  </div>
                </div>
              </div>
              <div className='flex h-full basis-5/6 flex-row gap-4'>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
                <div className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]'></div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <LaunchACollection />
    </div>
  );
}
