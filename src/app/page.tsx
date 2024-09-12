import { Container } from '@/components/Container';
import { DEFAULT_METADATA } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Home() {
  return (
    <div className="h-full gap-3 bg-ob-black bg-[url('../../public/img/hero.png')] bg-cover bg-center bg-no-repeat">
      <div className='h-full w-full bg-ob-black/[0.80] backdrop-blur-2xl'>
        <Container>
          <div className='text-4l flex h-[80vh] flex-col items-center justify-center'>
            <h1 className='mb-4 p-4 text-6xl font-bold'>
              <span className='bg-gradient-to-r from-ob-blue to-ob-green bg-clip-text text-transparent'>
                Trio.xyz
              </span>{' '}
              is coming soon
            </h1>
          </div>
        </Container>
      </div>
    </div>
  );
}
