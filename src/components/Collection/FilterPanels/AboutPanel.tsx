'use client';
import { MediaWrapper } from '@/components/common';
import { Container } from '@/components/Container';
import { HeroLayout, SplashPageLayout } from '@/components/Layouts';
import InscriptionSkeleton from '@/components/Skeletons/InscriptionSkeleton';
import { Button } from '@/components/ui/button';
import { useFilter } from '@/lib/hooks/useFilter';
import { useInscriptionsByCollectionSlug } from '@/lib/services/fetchInscriptionsByCollectionSlug';

export const AboutPanel = ({ slug }: { slug: string }) => {
  const { offset, limit } = useFilter();
  const { data, isPending, error, isPlaceholderData } = useInscriptionsByCollectionSlug(slug, {
    offset,
    limit
  });

  return (
    <SplashPageLayout media={{ type: 'inscription', id: data?.[0]?.inscription_id }}>
      <div className='flex h-full flex-col items-center justify-center'>
        <Container padding>
          <div className='flex flex-col gap-8'>
            <h1>About</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <div className='flex flex-row gap-4'>
              <Button variant='secondary'>Buy Now</Button>
            </div>
          </div>
        </Container>
      </div>
    </SplashPageLayout>
  );
};
