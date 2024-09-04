import { Container } from '@/components/Container';
import { BTC, DEFAULT_METADATA, DEFAULT_DIMENSIONS } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Home() {
  const { width, height } = DEFAULT_DIMENSIONS;
  return (
    <div
      className="
      h-full gap-3
      bg-no-repeat bg-cover bg-center bg-[url('../../public/img/hero.png')] bg-ob-black
    "
    >
      <div className='backdrop-blur-2xl h-full w-full'>
        <Container>
          <div className='flex text-4l flex-col items-center justify-center h-[80vh]'>
            <h1 className='text-4xl font-bold mb-4'>
              Welcome to your&nsbp;
              <Image
                src={BTC}
                alt='btc-logo'
                width={width}
                height={height}
                className='inline'
              />
              &nsbp; Ordinals NextJS App
            </h1>
            <p className='text-lg'>
              A template application with&nsbp;
              <Link
                className='hover:text-sky-500'
                href='https://www.npmjs.com/package/ordinalsbot'
                target='_blank'
              >
                ordinalsbot
              </Link>
              ,&nsbp;
              <Link
                className='hover:text-sky-500'
                href='https://docs.xverse.app/sats-connect'
                target='_blank'
              >
                sats-connect
              </Link>
              , and&nsbp;
              <Link
                className='hover:text-sky-500'
                href='https://firebase.google.com/'
                target='_blank'
              >
                Firebase
              </Link>
            </p>
            <p className='text-md'>
              **Themed with&nsbp;
              <Link
                className='hover:text-sky-500'
                href='https://ui.shadcn.com/'
                target='_blank'
              >
                ShadCN
              </Link>
              &nsbp; and&nsbp;
              <Link
                className='hover:text-sky-500'
                href='https://tailwindcss.com/'
                target='_blank'
              >
                Tailwind
              </Link>
              **
            </p>

            <p className='my-4 font-bold'>
              Visit&nsbp;
              <Link className='hover:text-sky-500' href='/inscribe'>
                /inscribe
              </Link>
              &nsbp; to check out our example direct inscription using the&nsbp;
              <a href='https://docs.ordinalsbot.com'>OrdinalsBot API</a>
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
