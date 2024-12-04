'use client';

import { MediaWrapper } from '../common';

import Link from 'next/link';
import { useContext } from 'react';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { shortenInscriptionId } from '@/lib/utilities';

const InscriptionCard = ({ id }: { id: string }) => {
  const { menuDisclosure } = useContext(GlobalContext);
  const handleClose = () => setTimeout(() => menuDisclosure.close(), 100);

  return (
    <div onClick={handleClose} className='relative h-full w-full max-w-[256px] rounded-xl bg-ob-purple'>
      <Link href={`/inscriptions/${id}`}>
        <div className='flex h-[256px] w-full max-w-[256px] flex-col items-center gap-4 p-4 pb-4'>
          <MediaWrapper
            key={id}
            id={id}
            square
            className='relative h-[--inscription-smaller] w-full overflow-hidden rounded-xl'
          />
        </div>
        <div className='p-2 pt-0 text-center'>{shortenInscriptionId(id)}</div>
      </Link>
    </div>
  );
};

export { InscriptionCard };
