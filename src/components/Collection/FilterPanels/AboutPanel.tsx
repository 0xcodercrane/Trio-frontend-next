'use client';
import { Container } from '@/components/Container';
import { SplashPageLayout } from '@/components/Layouts';
import { Button } from '@/components/ui/button';
import { useFilter } from '@/lib/hooks/useFilter';
import { useCollectionBySlugQuery } from '@/lib/services';
import { useInscriptionsByCollectionSlug } from '@/lib/services/fetchInscriptionsByCollectionSlug';
import { EMediaType } from '@/types';

export const AboutPanel = ({ slug }: { slug: string }) => {
  const { offset, limit } = useFilter();
  const {
    data: inscriptions,
    isPending,
    error,
    isPlaceholderData
  } = useInscriptionsByCollectionSlug(slug, {
    offset,
    limit
  });
  const { data: collectionData } = useCollectionBySlugQuery(slug);

  return (
    <SplashPageLayout media={{ type: EMediaType.INSCRIPTION, id: inscriptions?.[0]?.inscription_id }}>
      <div className='flex h-full flex-col items-center justify-center'>
        <Container padding>
          <div className='flex flex-col gap-8'>
            <h1>About</h1>
            <p>{collectionData?.description}</p>
            <div className='flex flex-row gap-4'>
              <Button variant='secondary'>Buy Now</Button>
            </div>
          </div>
        </Container>
      </div>
    </SplashPageLayout>
  );
};
