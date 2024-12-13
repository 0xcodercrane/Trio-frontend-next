import { InscriptionDetails } from '@/lib/services';
import React, { ReactNode, useState } from 'react';
import { Attribute } from '@/types';
import { formatFileSize, shortenInscriptionId } from '@/lib/utilities';
import { CopyButton } from '../CopyButton';
import { DateTime } from 'luxon';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { EXPLORER_URL } from '@/lib/constants';

type InscriptionInfoProps = {
  details: InscriptionDetails | undefined;
  attributes?: Array<Attribute>;
};

enum EInfoState {
  DETAILS,
  ATTRIBUTES
}

const DataRow = ({ label, children, isPending }: { label: string; children: ReactNode; isPending: boolean }) => (
  <>
    <dt className='col-span-1'>{label}</dt>{' '}
    <dd className='col-span-3 flex gap-2 break-words'>{isPending ? <Skeleton className='w-full' /> : children}</dd>
  </>
);

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
              <DataRow label='Incription ID' isPending={!details}>
                {shortenInscriptionId(details?.id || '')} <CopyButton text={details?.id || ''} />
              </DataRow>
              <DataRow label='Inscription Number' isPending={!details}>
                {details?.number.toLocaleString()}
              </DataRow>
              <DataRow label='Content Type' isPending={!details}>
                {details?.content_type}
              </DataRow>
              <DataRow label='Content Size' isPending={!details}>
                {formatFileSize(details?.content_length || 0)}
              </DataRow>
              <DataRow label='Sat Number' isPending={!details}>
                {details?.sat.toLocaleString()}
              </DataRow>
              <DataRow label='Inscribed' isPending={!details}>
                {DateTime.fromSeconds(details?.timestamp || 0).toRelative()}
              </DataRow>
              <DataRow label='Preview' isPending={false}>
                <Link href={`${EXPLORER_URL}/inscription/${details?.id}`}>View on Explorer</Link>
              </DataRow>
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
