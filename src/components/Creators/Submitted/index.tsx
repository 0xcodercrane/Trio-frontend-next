import { Button } from '@/components/ui/button';

export const Submitted = ({ slug }: { slug: string }) => {
  return (
    <div className='flex w-full items-center justify-center rounded-md bg-ob-purple-dark p-8 text-white'>
      <div className='flex flex-col gap-2'>
        <div className='text-center text-4xl font-bold'>Congratulations</div>
        <span className='text-center text-sm text-ob-grey-lightest'>
          Your collection &ldquo;{slug}&rdquo; has been submitted for review
        </span>

        <div className='mt-4 grid grid-cols-1 items-center justify-center gap-4 xl:grid-cols-2'>
          <Button size='lg' variant='default' className='mx-auto w-[280px!important] max-w-[280px!important] px-8 font-bold'>
            View launch Page
          </Button>
          <Button size='lg' variant='default' className='mx-auto w-[280px!important] max-w-[280px!important] px-8 font-bold'>
            Manage My Launches
          </Button>
        </div>
      </div>
    </div>
  );
};
