import { AuthContext } from '@/app/providers/AuthContext';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { ESteps, StartTypes } from '@/types/creators';
import { toast } from 'sonner';

export const GetStarted = ({ setStep }: { setStep: (step: number) => void }) => {
  const [startType, setStartType] = useState<StartTypes>(StartTypes.PREINSCRIBE);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='w-full rounded-md bg-ob-purple-dark p-8 text-white'>
      <div className='flex min-h-[42rem] flex-col items-center justify-center gap-[3rem] lg:p-12'>
        <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2'>
          <button
            onClick={() => setStartType(StartTypes.PREINSCRIBE)}
            className={`${startType === StartTypes.PREINSCRIBE ? 'bg-ob-purple-lighter' : 'bg-ob-purple'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:bg-ob-purple-lighter`}
          >
            <div className='p-3 pb-0'>
              <svg width='53' height='59' viewBox='0 0 53 59' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.166016 58.6673V0.333984H46.8327V27.2613C44.2149 25.8969 41.2389 25.1256 38.0827 25.1256C27.6123 25.1256 19.1243 33.6136 19.1243 44.084C19.1243 49.9478 21.7865 55.1898 25.9681 58.6673H0.166016ZM8.91602 9.08398H32.2493V13.459H8.91602V9.08398ZM8.91602 20.7506H20.5827V25.1256H8.91602V20.7506Z'
                  fill='white'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M38.0827 29.5006C30.0285 29.5006 23.4993 36.0298 23.4993 44.084C23.4993 52.1381 30.0285 58.6673 38.0827 58.6673C42.1092 58.6673 45.758 57.0326 48.3947 54.396C51.0313 51.7593 52.666 48.1105 52.666 44.084C52.666 36.0298 46.1368 29.5006 38.0827 29.5006ZM27.8743 44.084C27.8743 39.1969 31.3085 35.112 35.8952 34.1106V44.9901L43.5878 52.6827C41.9991 53.7023 40.1109 54.2923 38.0827 54.2923C32.4448 54.2923 27.8743 49.7219 27.8743 44.084ZM40.2702 43.1779V34.1106C44.8569 35.112 48.291 39.1969 48.291 44.084C48.291 46.1122 47.701 48.0004 46.6814 49.5891L40.2702 43.1779Z'
                  fill='white'
                />
              </svg>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <p
                className={`${startType === StartTypes.PREINSCRIBE ? 'text-white' : 'text-ob-text-grey'} text-center text-xl font-bold transition duration-200 group-hover:text-white xl:text-2xl`}
              >
                Create a new launch
              </p>
              <p
                className={`${startType === StartTypes.PREINSCRIBE ? 'text-white' : 'text-ob-text-grey'} text-sm transition duration-200 group-hover:text-white`}
              >
                Some Info
              </p>
            </div>
          </button>
          <button
            disabled
            onClick={() => setStartType(StartTypes.INSCRIBE)}
            className={`${startType === StartTypes.INSCRIBE ? 'bg-ob-purple-lighter' : 'bg-ob-purple'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:hover:bg-ob-purple-lighter disabled:hover:bg-ob-purple`}
          >
            <div className='p-3 pb-0'>
              <svg width='47' height='59' viewBox='0 0 47 59' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.166016 0.333984H46.8327V58.6673H0.166016V0.333984ZM11.8327 12.0007V16.3757H35.166V12.0007H11.8327ZM11.8327 23.6673V28.0423H35.166V23.6673H11.8327ZM11.8327 35.334V39.709H23.4993V35.334H11.8327Z'
                  fill='white'
                />
              </svg>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <p
                className={`${startType === StartTypes.INSCRIBE ? 'text-white' : 'text-ob-text-grey'} text-center text-xl font-bold transition duration-200 xl:text-2xl`}
              >
                Submit a live collection
              </p>
              <p
                className={`${startType === StartTypes.INSCRIBE ? 'text-white' : 'text-ob-text-grey'} text-sm transition duration-200`}
              >
                coming Soon
              </p>
            </div>
          </button>
        </div>
        <div className='flex gap-2'>
          <Button disabled size='lg' variant='default' className='min-w-52 rounded-md'>
            Previous
          </Button>
          <Button
            onClick={() => {
              if (!isAuthenticated) {
                toast.error('Please connect your wallet.');
                return;
              }
              setStep(ESteps.CHOOSE_TYPE);
            }}
            size='lg'
            variant='default'
            className='min-w-52 rounded-md'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
