import Section from '../Section';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

export default function PopularArtists() {
  return (
    <Section>
      <div className='flex flex-row justify-between py-16'>
        <h3>Popular Artists</h3>
        <span>View all Collections (3)</span>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex h-[256px] min-h-[256px] flex-row'>
          <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
            <h3>Popular</h3>
            <div className='flex flex-row items-center justify-between gap-4'>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronLeft color='white' size={30} />
              </Button>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronRight color='white' size={30} />
              </Button>
            </div>
          </div>
          <div className='flex h-full basis-5/6 flex-row gap-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton className='h-full w-full max-w-[256px] rounded-xl bg-[#252525]' key={index} />
            ))}
          </div>
        </div>
        <div className='flex h-[256px] min-h-[256px] flex-row'>
          <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
            <h3>Trending</h3>
            <div className='flex flex-row items-center justify-between gap-4'>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronLeft color='white' size={30} />
              </Button>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronRight color='white' size={30} />
              </Button>
            </div>
          </div>
          <div className='flex h-full basis-5/6 flex-row gap-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-dark' key={index} />
            ))}
          </div>
        </div>
        <div className='flex h-[256px] min-h-[256px] flex-row'>
          <div className='flex h-full basis-1/6 flex-col items-center justify-center gap-4'>
            <h3>A-Z</h3>
            <div className='flex flex-row items-center justify-between gap-4'>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronLeft color='white' size={30} />
              </Button>
              <Button variant='icon' className='h-[60px] w-[60px]' size='icon'>
                <ChevronRight color='white' size={30} />
              </Button>
            </div>
          </div>
          <div className='flex h-full basis-5/6 flex-row gap-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton className='h-full w-full max-w-[256px] rounded-xl bg-ob-purple-dark' key={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
