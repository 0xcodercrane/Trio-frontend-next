'use client';

export enum InscriptionTabs {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3
}

export enum UploadTabs {
  FIRST = 1,
  SECOND = 2
}

import Image from 'next/image';
import { useState } from 'react';

export const ChooseInscriptions = () => {
  const [inscriptioinTab, setInscriptionTab] = useState<InscriptionTabs>(InscriptionTabs.FIRST);
  const [uploadTab, setUploadTab] = useState<UploadTabs>(UploadTabs.FIRST);

  return (
    <div className='w-full rounded-md bg-ob-black-light p-8 text-white'>
      <div className='flex flex-col gap-8'>
        <div className='text-xl'>Example</div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div>How to format</div>
            <div>
              <p className='text-sm text-ob-grey-lightest'>
                Please upload your inscriptions list for your Ordinals collection. Please ensure that it&apos;s valid JSON
                formatting, you can use codebeautify to validate and beautify your payload. Please note: the field below is
                required, you must have a list of inscriptions in order to submit your application.
              </p>
            </div>
          </div>
          <div>
            <div className='grid grid-cols-3 gap-2'>
              <div
                onClick={() => setInscriptionTab(InscriptionTabs.FIRST)}
                className={`${InscriptionTabs.FIRST === inscriptioinTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
              >
                Inscription IDs, name & attributes
              </div>
              <div
                onClick={() => setInscriptionTab(InscriptionTabs.SECOND)}
                className={`${InscriptionTabs.SECOND === inscriptioinTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
              >
                Inscription IDs and name
              </div>
              <div
                onClick={() => setInscriptionTab(InscriptionTabs.THIRD)}
                className={`${InscriptionTabs.THIRD === inscriptioinTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
              >
                InscirptionIDs only
              </div>
            </div>
            <div className='min-h-[25rem] rounded-b-md bg-ob-grey-light p-8'></div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <div>Provide Inscriptions</div>
            <div>
              <p className='text-sm text-ob-grey-lightest'>Please choose between manual & JSON uploads.</p>
            </div>
          </div>

          <div>
            <div className='grid grid-cols-2 gap-2'>
              <div
                onClick={() => setUploadTab(UploadTabs.FIRST)}
                className={`${UploadTabs.FIRST === uploadTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
              >
                Upload JSON
              </div>
              <div
                onClick={() => setUploadTab(UploadTabs.SECOND)}
                className={`${UploadTabs.SECOND === uploadTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
              >
                Enter Manually
              </div>
            </div>
            <div className='flex min-h-[25rem] items-center justify-center rounded-b-md bg-ob-grey-light p-8'>
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
  );
};
