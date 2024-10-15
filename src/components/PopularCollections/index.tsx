import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/Section';

export default function PopularCollections() {
  return (
    <Section className='bg-ob-black-lighter'>
      <div className='flex flex-row justify-between py-16'>
        <h3>Popular Collections</h3>
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
    </Section>
  );
}
