import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useState } from 'react';

export enum UploadTypes {
  MANUALL = 1,
  CSV = 2
}

export const DeterminePhases = () => {
  const [uploadType, setUploadType] = useState(UploadTypes.MANUALL);

  return (
    <div className='flex w-full flex-col gap-12 rounded-md bg-ob-purple-darkest text-white'>
      <div className='flex'>
        <div className='border-3 flex w-28 items-center justify-center border-l border-ob-grey-light'>
          <div className='flex flex-col items-center gap-2'>
            <span className='font-bold'>Phase</span>
            <span
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#5E5D5D] text-sm font-bold text-white`}
            >
              1
            </span>
          </div>
        </div>

        <div className='flex w-full flex-col gap-6'>
          <div className='bg-ob-purple-darkest-light flex w-full flex-col gap-8 rounded-md p-8'>
            <div className='flex w-full justify-between'>
              <div className='flex items-center gap-2'>
                <label className='font-bold'>Whitelist</label>
                <div className='rounded-sm bg-white p-2'>
                  <Image width={10} height={10} src={'/img/creators/pen.svg'} alt='pen' />
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex items-center gap-2'>
                  <div className='rounded-sm bg-white p-2'>
                    <Image width={10} height={10} src={'/img/creators/check.svg'} alt='pen' />
                  </div>
                  <label className='font-bold text-ob-grey-lighter'>Allowlist</label>
                </div>
                <div className='rounded-sm bg-white p-2'>
                  <Image width={10} height={10} src={'/img/creators/times.svg'} alt='pen' />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Start Date</label>
                <Input
                  type='date'
                  placeholder='01/12/24'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>End Date</label>
                <Input
                  type='date'
                  placeholder='01/12/24'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Start Time</label>
                <Input
                  type='text'
                  placeholder='00:00'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>End Time</label>
                <Input
                  type='text'
                  placeholder='00:00'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Price (BTC)</label>
                <Input
                  type='text'
                  placeholder='0.001'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Allocation Limit</label>
                <Input type='text' placeholder='5' className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none' />
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <div>Upload / Enter Addresses</div>

              <div className='mt-1 flex gap-2'>
                <Button
                  onClick={() => setUploadType(UploadTypes.MANUALL)}
                  variant={uploadType === UploadTypes.MANUALL ? 'secondary' : 'default'}
                  size={'sm'}
                  className='rounded-md'
                >
                  Enter Manually
                </Button>
                <Button
                  onClick={() => setUploadType(UploadTypes.CSV)}
                  variant={uploadType === UploadTypes.CSV ? 'secondary' : 'default'}
                  size={'sm'}
                  className='rounded-md'
                >
                  Upload CSV
                </Button>
              </div>

              <div className='flex w-full flex-col gap-2'>
                {uploadType === UploadTypes.MANUALL ? (
                  <Textarea
                    placeholder='Enter your addresses separated by commas'
                    className='w-full border-none bg-ob-grey-light px-5 py-5 outline-none'
                    rows={6}
                  />
                ) : (
                  <div className='group flex min-h-40 cursor-pointer items-center justify-center rounded-md border-[1px] border-[#FFFFFF33]'>
                    <Image
                      alt='upload'
                      src='/img/creators/upload.svg'
                      className='opacity-70 transition duration-100 hover:opacity-100'
                      width={70}
                      height={70}
                    />
                  </div>
                )}
              </div>
            </div>

            <Button size={'lg'} variant={'secondary'} className='font-bold'>
              Done
            </Button>
          </div>

          <div className='bg-ob-purple-darkest-light flex w-full flex-col gap-8 rounded-md p-8'>
            <Button size={'sm'} variant={'secondary'}>
              Add Phase
            </Button>
          </div>
        </div>
      </div>

      <div className='flex'>
        <div className='border-3 flex w-28 items-center justify-center border-l border-ob-grey-light'>
          <div className='flex flex-col items-center gap-2'>
            <span className='font-bold'>Phase</span>
            <span
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#5E5D5D] text-sm font-bold text-white`}
            >
              2
            </span>
          </div>
        </div>

        <div className='flex w-full flex-col gap-6'>
          <div className='bg-ob-purple-darkest-light flex w-full flex-col gap-8 rounded-md p-8'>
            <div className='flex w-full justify-between'>
              <div className='flex items-center gap-2'>
                <label className='font-bold'>Whitelist</label>
                <div className='rounded-sm bg-white p-2'>
                  <Image width={10} height={10} src={'/img/creators/pen.svg'} alt='pen' />
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex items-center gap-2'>
                  <div className='rounded-sm bg-white p-2'>
                    <Image width={10} height={10} src={'/img/creators/check.svg'} alt='pen' />
                  </div>
                  <label className='font-bold text-ob-grey-lighter'>Allowlist</label>
                </div>
                <div className='rounded-sm bg-white p-2'>
                  <Image width={10} height={10} src={'/img/creators/times.svg'} alt='pen' />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Start Date</label>
                <Input
                  type='date'
                  placeholder='01/12/24'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>End Date</label>
                <Input
                  type='date'
                  placeholder='01/12/24'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Start Time</label>
                <Input
                  type='text'
                  placeholder='00:00'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>End Time</label>
                <Input
                  type='text'
                  placeholder='00:00'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Price (BTC)</label>
                <Input
                  type='text'
                  placeholder='0.001'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Allocation Limit</label>
                <Input type='text' placeholder='5' className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none' />
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <div>Upload / Enter Addresses</div>

              <div className='mt-1 flex gap-2'>
                <Button
                  onClick={() => setUploadType(UploadTypes.MANUALL)}
                  variant={uploadType === UploadTypes.MANUALL ? 'secondary' : 'default'}
                  size={'sm'}
                  className='rounded-md'
                >
                  Enter Manually
                </Button>
                <Button
                  onClick={() => setUploadType(UploadTypes.CSV)}
                  variant={uploadType === UploadTypes.CSV ? 'secondary' : 'default'}
                  size={'sm'}
                  className='rounded-md'
                >
                  Upload CSV
                </Button>
              </div>

              <div className='flex w-full flex-col gap-2'>
                {uploadType === UploadTypes.MANUALL ? (
                  <Textarea
                    placeholder='Enter your addresses separated by commas'
                    className='w-full border-none bg-ob-grey-light px-5 py-5 outline-none'
                    rows={6}
                  />
                ) : (
                  <div className='group flex min-h-40 cursor-pointer items-center justify-center rounded-md border-[1px] border-[#FFFFFF33]'>
                    <Image
                      alt='upload'
                      src='/img/creators/upload.svg'
                      className='opacity-70 transition duration-100 hover:opacity-100'
                      width={70}
                      height={70}
                    />
                  </div>
                )}
              </div>
            </div>

            <Button size={'lg'} variant={'secondary'} className='font-bold'>
              Done
            </Button>
          </div>

          <div className='bg-ob-purple-darkest-light flex w-full flex-col gap-8 rounded-md p-8'>
            <Button size={'sm'} variant={'secondary'}>
              Add Phase
            </Button>
          </div>
        </div>
      </div>

      <div className='flex'>
        <div className='border-3 flex w-28 items-center justify-center border-l border-ob-grey-light'>
          <div className='flex flex-col items-center gap-2'>
            <span className='font-bold'>Phase</span>
            <span
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#5E5D5D] text-sm font-bold text-white`}
            >
              3
            </span>
          </div>
        </div>

        <div className='flex w-full flex-col gap-6'>
          <div className='bg-ob-purple-darkest-light flex w-full flex-col gap-8 rounded-md p-8'>
            <div className='flex w-full justify-between'>
              <div className='flex items-center gap-2'>
                <label className='font-bold'>Public</label>
                <div className='rounded-sm bg-white p-2'>
                  <Image width={10} height={10} src={'/img/creators/pen.svg'} alt='pen' />
                </div>
              </div>
              <div className='flex'>
                <div className='rounded-sm bg-white p-2'>
                  <Image width={10} height={10} src={'/img/creators/times.svg'} alt='pen' />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Start Date</label>
                <Input
                  type='date'
                  placeholder='01/12/24'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>End Date</label>
                <Input
                  type='date'
                  placeholder='01/12/24'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>Start Time</label>
                <Input
                  type='text'
                  placeholder='00:00'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
              <div className='flex w-full flex-col gap-1'>
                <label className='text-sm'>End Time</label>
                <div className='flex bg-ob-grey-light'>
                  <Input
                    type='text'
                    placeholder='00:00'
                    className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                  />
                  <div className='flex items-center gap-2 rounded-md'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-white'>
                      <Image width={10} height={10} src={'/img/creators/check.svg'} alt='check' className='w-[15px]' />
                    </div>
                    <label className='mr-5 text-ob-grey-lighter'>Indefinite</label>
                  </div>
                </div>
              </div>
              <div className='col-span-2 flex w-full flex-col gap-1'>
                <label className='text-sm'>Price (BTC)</label>
                <Input
                  type='text'
                  placeholder='0.001'
                  className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                />
              </div>
            </div>

            <Button size={'lg'} variant={'secondary'} className='font-bold'>
              Done
            </Button>
          </div>

          <div className='bg-ob-purple-darkest-light flex w-full flex-col gap-8 rounded-md p-8'>
            <Button size={'sm'} variant={'secondary'}>
              Add Phase
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
