import { Button } from '@/components/ui/button';

export default function LaunchACollection() {
  return (
    <div className='flex h-full max-h-[100vh] w-full flex-row items-center justify-center overflow-hidden bg-ob-black-lighter'>
      <div className='flex h-full w-1/2 flex-col justify-start gap-8 p-24 text-white'>
        <h2 className='bold capitalize'>Launch a Collection</h2>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam.
        </span>
        <Button variant='secondary'>Launch</Button>
      </div>

      <div className='flex w-1/2 flex-row items-center justify-center gap-4'>
        <div className='-mb-96 flex h-full w-2/5 flex-col gap-4'>
          {Array.from({ length: 4 }).map((_, index) => {
            return <div key={index} className='h-[420px] max-h-[420px] w-full rounded-xl bg-[#252525]'></div>;
          })}
        </div>

        <div className='mb-16 flex h-full w-2/5 flex-col gap-4'>
          {Array.from({ length: 4 }).map((_, index) => {
            return <div key={index} className='h-[420px] max-h-[420px] w-full rounded-xl bg-[#252525]'></div>;
          })}
        </div>
      </div>
    </div>
  );
}
