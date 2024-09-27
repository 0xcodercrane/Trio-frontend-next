import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/Container';

export default function PopularCollections() {
  return (
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
  );
}
