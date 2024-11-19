import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';

export enum StartTypes {
  DEFAULT = 0,
  PREINSCRIBE = 1,
  INSCRIBE = 2,
  AUCTION = 3,
  EDITION = 4
}

export const GetStarted = ({ setStep }: { setStep: (step: number) => void }) => {
  const [startType, setStartType] = useState<StartTypes>(StartTypes.PREINSCRIBE);

  return (
    <div className='w-full rounded-md bg-ob-black-light p-8 text-white'>
      <div className='flex min-h-[42rem] flex-col items-center justify-center gap-[3rem] lg:p-12'>
        <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-4'>
          <button
            onClick={() => setStartType(StartTypes.PREINSCRIBE)}
            className={`${startType === StartTypes.PREINSCRIBE ? 'bg-[#343434]' : 'bg-ob-grey-light/60'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:bg-[#343434]`}
          >
            <div className='p-3 pb-0'>
              <Image
                src='/img/creators/pre-inscribe.svg'
                alt='starter_img'
                width={50}
                height={50}
                className={`${startType === StartTypes.PREINSCRIBE ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 group-hover:opacity-100`}
              />
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <p
                className={`${startType === StartTypes.PREINSCRIBE ? 'text-white' : 'text-ob-text-grey'} text-center text-xl font-bold transition duration-200 group-hover:text-white xl:text-2xl`}
              >
                Pre Inscibe
              </p>
              <p
                className={`${startType === StartTypes.PREINSCRIBE ? 'text-white' : 'text-ob-text-grey'} text-sm transition duration-200 group-hover:text-white`}
              >
                Some Info
              </p>
            </div>
          </button>
          <button
            disabled={true}
            onClick={() => setStartType(StartTypes.INSCRIBE)}
            className={`${startType === StartTypes.INSCRIBE ? 'bg-[#343434]' : 'bg-ob-grey-light/60'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:bg-[#343434] disabled:hover:bg-ob-grey-light/60`}
          >
            <div className='p-3 pb-0'>
              <Image
                src='/img/creators/inscribe.svg'
                alt='starter_img'
                width={50}
                height={50}
                className={`${startType === StartTypes.INSCRIBE ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200`}
              />
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <p
                className={`${startType === StartTypes.INSCRIBE ? 'text-white' : 'text-ob-text-grey'} text-center text-xl font-bold transition duration-200 xl:text-2xl`}
              >
                Inscribe
              </p>
              <p
                className={`${startType === StartTypes.INSCRIBE ? 'text-white' : 'text-ob-text-grey'} text-sm transition duration-200`}
              >
                coming Soon
              </p>
            </div>
          </button>
          <button
            disabled={true}
            onClick={() => setStartType(StartTypes.AUCTION)}
            className={`${startType === StartTypes.AUCTION ? 'bg-[#343434]' : 'bg-ob-grey-light/60'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:bg-[#343434] disabled:hover:bg-ob-grey-light/60`}
          >
            <div className='p-3 pb-0'>
              <Image
                src='/img/creators/auction.svg'
                alt='starter_img'
                width={50}
                height={50}
                className={`${startType === StartTypes.AUCTION ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200`}
              />
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <p
                className={`${startType === StartTypes.AUCTION ? 'text-white' : 'text-ob-text-grey'} text-center text-xl font-bold transition duration-200 xl:text-2xl`}
              >
                Auction
              </p>
              <p
                className={`${startType === StartTypes.AUCTION ? 'text-white' : 'text-ob-text-grey'} text-sm transition duration-200`}
              >
                coming Soon
              </p>
            </div>
          </button>
          <button
            disabled={true}
            onClick={() => setStartType(StartTypes.EDITION)}
            className={`${startType === StartTypes.EDITION ? 'bg-ob-dark-grey' : 'bg-ob-grey-light/60'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:bg-[#343434] disabled:hover:bg-ob-grey-light/60`}
          >
            <div className='p-3 pb-0'>
              <Image
                src='/img/creators/edition.svg'
                alt='starter_img'
                width={50}
                height={50}
                className={`${startType === StartTypes.EDITION ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200`}
              />
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <p
                className={`${startType === StartTypes.EDITION ? 'text-white' : 'text-ob-text-grey'} text-center text-xl font-bold transition duration-200 xl:text-2xl`}
              >
                Edition
              </p>
              <p
                className={`${startType === StartTypes.EDITION ? 'text-white' : 'text-ob-text-grey'} text-sm transition duration-200`}
              >
                coming Soon
              </p>
            </div>
          </button>
        </div>
        <div className='flex gap-2'>
          <Button disabled={true} size='lg' variant='secondary'>
            Previous
          </Button>
          <Button disabled={startType !== StartTypes.PREINSCRIBE} onClick={() => setStep(2)} size='lg' variant='secondary'>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
