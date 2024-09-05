import { Container } from '@/components/Container';
import { DEFAULT_METADATA } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Home() {
  return (
    <div
      className="
      h-full gap-3
      bg-no-repeat bg-cover bg-center bg-[url('../../public/img/hero.png')] bg-ob-black
    "
    >
      <div className='backdrop-blur-2xl bg-ob-black/[0.80] h-full w-full'>
        <Container>
          <div className='flex text-4l flex-col items-center justify-center h-[80vh]'>
            <h1 className='text-6xl font-bold mb-4 p-4'>
              <span className='bg-gradient-to-r from-ob-blue to-ob-green bg-clip-text text-transparent'>Trio.xyz</span> is coming soon
            </h1>
          </div>
        </Container>
      </div>
    </div>
  );
}
