import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export const SubmitInformation = () => {
  return (
    <div className='w-full rounded-md bg-ob-purple-dark px-8 py-12 text-white'>
      <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8'>
        <div className='flex w-full flex-col gap-4'>
          <div className='flex w-full flex-col gap-1'>
            <label className='text-sm'>Collection Name</label>
            <Input type='text' placeholder='XXX' className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none' />
          </div>
          <div className='flex w-full flex-col gap-1'>
            <label className='text-sm'>Collection Description</label>
            <Textarea placeholder='XXX' className='w-full border-none bg-ob-grey-light px-5 py-5 outline-none' rows={6} />
          </div>
          <div className='flex w-full flex-col gap-1'>
            <label className='text-sm'>Collection Name</label>
            <Input type='text' placeholder='XXX' className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none' />
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='flex w-full flex-col gap-1'>
              <label className='text-sm'>X Handle</label>
              <div className='flex items-center bg-ob-grey-light'>
                <Input
                  type='text'
                  placeholder='XXX'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
                <Button size='sm' variant='secondary' className='mr-5 text-xs'>
                  Connect
                </Button>
              </div>
            </div>
            <div className='flex w-full flex-col gap-1'>
              <label className='text-sm'>Discord Handle</label>
              <div className='flex items-center bg-ob-grey-light'>
                <Input
                  type='text'
                  placeholder='XXX'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
                <Button size='sm' variant='secondary' className='mr-5 text-xs'>
                  Connect
                </Button>
              </div>
            </div>
            <div className='flex w-full flex-col gap-1'>
              <label className='text-sm'>Telegram Handle</label>
              <Input type='text' placeholder='XXX' className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none' />
            </div>
            <div className='flex w-full flex-col gap-1'>
              <label className='text-sm'>Instagram Handle</label>
              <Input type='text' placeholder='XXX' className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none' />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex w-full flex-col gap-1'>
              <label className='text-sm'>Collection Name</label>
              <Input
                type='text'
                placeholder='My Profile Name'
                className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
              />
            </div>
            <div className='flex w-full flex-col gap-1'>
              <label className='text-sm'>Collection Email</label>
              <Input
                type='text'
                placeholder='My Profile Email'
                className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
              />
            </div>
          </div>
          <div className='flex w-full flex-col gap-1'>
            <label className='text-sm'>Creator BTC AFddress</label>
            <Input type='text' placeholder='XXX' className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none' />
          </div>
          <div className='grid grid-cols-1 gap-2 xl:grid-cols-2'>
            <div className='flex flex-col gap-2 xl:mt-[1.8rem]'>
              <label className='text-xs'>Collection Thumbnail Image - (1920 x 1200px {`<`} 1mb)</label>
              <div className='group mt-2 flex h-full min-h-72 cursor-pointer items-center justify-center rounded-md border-[1px] border-[#FFFFFF33]'>
                <Image
                  alt='upload'
                  src='/img/creators/upload.svg'
                  className='opacity-70 transition duration-100 hover:opacity-100'
                  width={131}
                  height={131}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 xl:mt-[1.8rem]'>
              <label className='text-xs'>Collection Banner Image - (1920 x 1200px {`<`} 1mb)</label>
              <div className='group mt-2 flex h-full min-h-72 cursor-pointer items-center justify-center rounded-md border-[1px] border-[#FFFFFF33]'>
                <Image
                  alt='upload'
                  src='/img/creators/upload.svg'
                  className='opacity-70 transition duration-100 hover:opacity-100'
                  width={131}
                  height={131}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
