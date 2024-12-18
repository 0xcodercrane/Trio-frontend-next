import { satsToBitcoin } from '@/lib/utilities';

export const InscriptionOverlay = ({ name, rank, price }: { id: string; name: string; price?: number; rank?: number }) => {
  return (
    <div className='absolute bottom-0 z-10 flex h-full w-full flex-col justify-end rounded-xl'>
      {/* {
        <div className='absolute right-3 top-3 hover:cursor-pointer hover:opacity-80'>
          <Favorite action={() => {}} />
        </div>
      } */}
      <div className='flex w-full flex-row items-center justify-between rounded-b-xl bg-[#000]/[0.50] px-4 py-2 text-center backdrop-blur-2xl'>
        <span className='text-left font-extrabold capitalize'>{name}</span>
        {rank ? <span className='text-xs font-extrabold'>#{rank}</span> : null}
        {price ? (
          <span className='text-xs font-extrabold'>{satsToBitcoin(price)} BTC</span>
        ) : (
          <span className='text-xs font-thin italic'>Unlisted</span>
        )}
      </div>
    </div>
  );
};
