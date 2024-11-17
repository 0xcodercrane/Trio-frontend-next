import { Button } from '@/components/ui/button';

export const SubmitFailed = () => {
  return (
    <div className='flex w-full items-center justify-center rounded-md bg-ob-purple-dark p-8 text-white'>
      <div className='flex flex-col gap-2'>
        <div className='text-center text-4xl font-bold'>Failure State</div>
        <span className='text-center text-sm text-ob-grey-lightest'>This may take some time</span>
        <div className='mt-4'>
          <Button size='lg' variant={'secondary'} className='w-[240px] max-w-[240px] px-8 font-bold'>
            Manage My Launches
          </Button>
        </div>
      </div>
    </div>
  );
};
