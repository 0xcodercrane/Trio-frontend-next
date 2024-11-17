import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const SubmitProject = () => {
  return (
    <div className='flex w-full flex-col gap-12'>
      <div className='flex w-full flex-col gap-6 rounded-md bg-ob-purple-dark p-8 text-white'>
        <div className='flex flex-col gap-1'>
          <div className='text-lg'>Sign</div>
          <div>
            <p className='text-sm text-ob-grey-lightest'>You are hereby agreeing to sign 5,000 inscriptions.</p>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-2 xl:grid-cols-3'>
          <div
            className={`flex min-h-[7.5rem] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-[#343434] text-center text-3xl font-bold`}
          >
            WhiteList
            <span className='text-sm font-normal text-ob-grey-lighter'>0.005 BTC (350 Sats)</span>
          </div>
          <div
            className={`flex min-h-[7.5rem] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-[#343434] text-center text-3xl font-bold`}
          >
            Public
            <span className='text-sm font-normal text-ob-grey-lighter'>0.005 BTC (350 Sats)</span>
          </div>
          <div
            className={`flex min-h-[7.5rem] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-[#343434] text-center text-3xl font-bold`}
          >
            ???
            <span className='text-sm font-normal text-ob-grey-lighter'>0.005 BTC (350 Sats)</span>
          </div>
        </div>
        <Button size={'lg'} variant={'secondary'} className='w-[220px!important] max-w-[220px!important] px-8 font-bold'>
          Sign Transactions
        </Button>
      </div>
      <div className='w-full rounded-md bg-ob-purple-dark px-8 py-20 text-white'>
        <div className='text-lg'>Terms & Conditions</div>

        <div className='mt-4 flex w-full flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <Input type='checkbox' className='h-fit w-fit accent-white' defaultChecked={true} />
            <p className='text-sm text-ob-grey-lightest'>
              You agree that you have the right to submit this collection and that it does not violate any intellectual
              property rights.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Input type='checkbox' className='h-fit w-fit accent-white' defaultChecked={false} />

            <p className='text-sm text-ob-grey-lightest'>
              You agree that the collection does not contain any illegal or NSFW content.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Input type='checkbox' className='h-fit w-fit accent-white' defaultChecked={false} />

            <p className='text-sm text-ob-grey-lightest'>
              You agree that OrdinalsBot will not be held responsible for any damages caused by the collection and the
              collection can be removed at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
