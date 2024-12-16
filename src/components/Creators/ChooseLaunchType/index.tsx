import { AuthContext } from '@/app/providers/AuthContext';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { ESteps, StartTypes } from '@/types/creators';

export const ChooseLaunchType = ({ setStep }: { setStep: (step: number) => void }) => {
  const [startType, setStartType] = useState<StartTypes>(StartTypes.PREINSCRIBE);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='w-full rounded-md bg-ob-purple-dark p-8 text-white'>
      <div className='flex min-h-[42rem] flex-col items-center justify-center gap-[3rem] lg:p-12'>
        <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-4'>
          <button
            onClick={() => setStartType(StartTypes.PREINSCRIBE)}
            className={`${startType === StartTypes.PREINSCRIBE ? 'bg-ob-purple-lighter' : 'bg-ob-purple'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:bg-ob-purple-lighter`}
          >
            <div className='p-3 pb-0'>
              <svg
                width='53'
                height='59'
                viewBox='0 0 53 59'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={`${startType === StartTypes.PREINSCRIBE ? 'opacity-100' : 'opacity-60'}`}
              >
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
                Pre Inscribe
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
              <svg
                width='47'
                height='59'
                viewBox='0 0 47 59'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={`${startType === StartTypes.INSCRIBE ? 'opacity-100' : 'opacity-60'}`}
              >
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
            disabled
            onClick={() => setStartType(StartTypes.AUCTION)}
            className={`${startType === StartTypes.AUCTION ? 'bg-ob-purple-lighter' : 'bg-ob-purple'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:bg-[#343434] disabled:hover:bg-ob-purple`}
          >
            <div className='p-3 pb-0'>
              <svg
                width='71'
                height='71'
                viewBox='0 0 71 71'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={`${startType === StartTypes.AUCTION ? 'opacity-100' : 'opacity-60'}`}
              >
                <path
                  d='M49.9211 8.43172C49.0669 7.57745 47.6818 7.57745 46.8276 8.43172L27.14 28.1192C26.2858 28.9735 26.2858 30.3585 27.14 31.2128L35.1609 39.2336C36.0152 40.0879 37.4002 40.0879 38.2545 39.2336L46.5514 30.9367L59.2234 43.6086C60.0777 44.4629 61.4627 44.4629 62.317 43.6086C63.1712 42.7544 63.1712 41.3693 62.317 40.5151L49.645 27.8431L57.942 19.5461C58.7962 18.6919 58.7962 17.3068 57.942 16.4526L49.9211 8.43172Z'
                  fill='white'
                />
                <path
                  d='M11.7702 22.8118C10.8037 22.087 9.43256 22.2829 8.70768 23.2493C7.98281 24.2158 8.17868 25.587 9.14518 26.3118L14.9785 30.6868C15.945 31.4117 17.3161 31.2158 18.041 30.2493C18.7659 29.2829 18.57 27.9117 17.6035 27.1868L11.7702 22.8118Z'
                  fill='white'
                />
                <path
                  d='M5.35352 36.9577C4.14539 36.9577 3.16602 37.9371 3.16602 39.1452C3.16602 40.3533 4.14539 41.3327 5.35352 41.3327H12.6452C13.8533 41.3327 14.8327 40.3533 14.8327 39.1452C14.8327 37.9371 13.8533 36.9577 12.6452 36.9577H5.35352Z'
                  fill='white'
                />
                <path
                  d='M14.1035 48.6243C13.1619 48.6243 12.326 49.2268 12.0283 50.1201L9.61019 57.3743H8.27018C7.06206 57.3743 6.08268 58.3537 6.08268 59.5618C6.08268 60.77 7.06206 61.7493 8.27018 61.7493H47.6452C48.8533 61.7493 49.8327 60.77 49.8327 59.5618C49.8327 58.3537 48.8533 57.3743 47.6452 57.3743H46.3052L43.8871 50.1201C43.5893 49.2268 42.7534 48.6243 41.8118 48.6243H14.1035Z'
                  fill='white'
                />
              </svg>
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
            disabled
            onClick={() => setStartType(StartTypes.EDITION)}
            className={`${startType === StartTypes.EDITION ? 'bg-ob-purple-lighter' : 'bg-ob-purple'} group flex min-h-56 w-full flex-col items-center justify-center gap-2 rounded-lg py-11 transition duration-200 hover:bg-[#343434] disabled:hover:bg-ob-purple`}
          >
            <div className='p-3 pb-0'>
              <svg
                width='71'
                height='71'
                viewBox='0 0 71 71'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={`${startType === StartTypes.PREINSCRIBE ? 'opacity-100' : 'opacity-60'}`}
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M14.6035 6.33398C13.3954 6.33398 12.416 7.31336 12.416 8.52148V62.4798C12.416 63.6879 13.3954 64.6673 14.6035 64.6673H56.8952C58.1033 64.6673 59.0827 63.6879 59.0827 62.4798V8.52148C59.0827 7.31336 58.1033 6.33398 56.8952 6.33398H14.6035ZM16.791 60.2923V53.0006H54.7077V60.2923H16.791ZM36.9398 21.4548C36.7986 21.737 36.5698 21.9658 36.2876 22.1069L32.5256 23.9879C31.4507 24.5254 31.4507 26.0593 32.5256 26.5967L36.2876 28.4777C36.5698 28.6188 36.7986 28.8477 36.9398 29.1299L38.8208 32.8919C39.3582 33.9668 40.8921 33.9668 41.4295 32.8919L43.3105 29.1299C43.4516 28.8477 43.6805 28.6188 43.9627 28.4777L47.7247 26.5967C48.7996 26.0593 48.7996 24.5254 47.7247 23.9879L43.9627 22.1069C43.6805 21.9658 43.4516 21.737 43.3105 21.4548L41.4295 17.6927C40.8921 16.6179 39.3582 16.6179 38.8208 17.6927L36.9398 21.4548ZM26.1584 34.2676C26.0737 34.4369 25.9364 34.5742 25.767 34.6589L22.7321 36.1764C22.0871 36.4988 22.0871 37.4192 22.7321 37.7416L25.767 39.2591C25.9364 39.3438 26.0737 39.4811 26.1584 39.6504L27.6759 42.6854C27.9983 43.3303 28.9186 43.3303 29.2411 42.6854L30.7586 39.6504C30.8433 39.4811 30.9806 39.3438 31.1499 39.2591L34.1849 37.7416C34.8298 37.4191 34.8298 36.4988 34.1849 36.1764L31.1499 34.6589C30.9806 34.5742 30.8433 34.4369 30.7586 34.2676L29.2411 31.2326C28.9186 30.5876 27.9983 30.5877 27.6759 31.2326L26.1584 34.2676Z'
                  fill='white'
                />
              </svg>
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
          <Button onClick={() => setStep(ESteps.START)} size='lg' variant='default' className='min-w-52 rounded-md'>
            Previous
          </Button>
          <Button
            disabled={!isAuthenticated}
            onClick={() => setStep(ESteps.INFORMATION)}
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
