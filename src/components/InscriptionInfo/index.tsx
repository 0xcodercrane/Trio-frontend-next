import { InscriptionDetails } from '@/lib/services';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Attribute } from '@/types';
import { shortenInscriptionId } from '@/lib/utilities';

type InscriptionInfoProps = {
  details: InscriptionDetails | undefined;
  attributes?: Array<Attribute>;
};

enum EInfoState {
  DETAILS,
  ATTRIBUTES
}

export default function InscriptionInfo({ details }: InscriptionInfoProps) {
  const [selectedTab, setSelectedTab] = useState<EInfoState>(EInfoState.DETAILS);
  return (
    <div className='rounded-lg bg-ob-purple-dark text-white'>
      <div className='flex basis-1/2 flex-row rounded-lg bg-ob-purple'>
        <button
          className={`w-full rounded-lg p-4 text-center ${selectedTab === EInfoState.DETAILS ? 'bg-ob-purple-lighter' : 'bg-ob-purple'}`}
          onClick={() => setSelectedTab(EInfoState.DETAILS)}
        >
          Details
        </button>
        <button
          className={`w-full rounded-lg p-4 text-center ${selectedTab === EInfoState.ATTRIBUTES ? 'bg-ob-purple-lighter' : 'bg-ob-purple'}`}
          onClick={() => setSelectedTab(EInfoState.ATTRIBUTES)}
        >
          Attributes
        </button>
      </div>
      <div className='p-4'>
        {selectedTab === EInfoState.DETAILS ? (
          <div>
            <div className='text-xl'>Inscription Information</div>
            <dl className='mt-4 grid grid-cols-4 gap-2'>
              <dt className='col-span-1'>Inscription ID</dt>{' '}
              <dd className='col-span-3 break-words'>{shortenInscriptionId(details?.id ?? '')}</dd>
              <dt className='col-span-1'>Inscription Number</dt>{' '}
              <dd className='col-span-3 break-words'>{details?.number}</dd>
              <dt className='col-span-1'>Sat Number</dt> <dd className='col-span-3 break-words'>{details?.sat}</dd>
              {details?.charms && details.charms.length > 0 && (
                <>
                  <dt className='col-span-1'>Sat Type</dt>
                  <dd className='col-span-3 break-words'>{details?.charms}</dd>
                </>
              )}
            </dl>
          </div>
        ) : (
          // TODO: Render attributes.
          <>Coming soon.</>
        )}
      </div>
    </div>
  );
}
