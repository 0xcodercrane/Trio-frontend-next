import { Inscription } from '@/types/database';
import { Container } from '@/components/Container';
import { MediaWrapper } from '@/components/common';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { InscriptionOverlay } from '../InscriptionOverlay';
import InscriptionSkeleton from '../Skeletons/InscriptionSkeleton';

export default function Carousel({ inscriptions, loading }: { inscriptions: Inscription[]; loading: boolean }) {
  return (
    <Container>
      <div className='flex flex-row gap-2'>
        <div className='flex cursor-pointer items-center justify-center' onClick={() => {}}>
          <Button size='icon' variant='ghost'>
            <ChevronLeft />
          </Button>
        </div>
        <div className='flex w-full flex-row gap-4 overflow-hidden'>
          {!loading &&
            inscriptions.slice(0, 5).map(({ inscription_id }, index) => (
              <div
                key={inscription_id}
                className={`relative max-h-[--inscription-large] max-w-[--inscription-large] basis-1/6 ${index === 2 ? 'grow' : ''}`}
              >
                <InscriptionOverlay id={inscription_id} name='Test' />
                <MediaWrapper id={inscription_id} size='full' className='relative overflow-hidden rounded-xl' />
              </div>
            ))}
          {loading &&
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`relative basis-1/6 sm:min-h-[--inscription-small] md:min-h-[--inscription-default] lg:min-h-[--inscription-default] ${index === 2 ? 'grow' : ''}`}
              >
                <InscriptionSkeleton key={index} size='--inscription-large' />
              </div>
            ))}
        </div>

        <div className='flex cursor-pointer items-center justify-center' onClick={() => {}}>
          <Button size='icon' variant='ghost'>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </Container>
  );
}
