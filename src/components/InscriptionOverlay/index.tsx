import Favorite from '@/components/Favorite';

export const InscriptionOverlay = ({ id, name, rank }: { id: string; name: string; rank?: number }) => {
  return (
    <div className='absolute bottom-0 z-10 flex h-full w-full flex-col justify-end rounded-xl opacity-0 hover:opacity-100'>
      {
        <div className='absolute right-3 top-3 hover:cursor-pointer hover:opacity-80'>
          <Favorite action={() => {}} />
        </div>
      }
      <div className='flex w-full flex-row items-center justify-between rounded-b-xl bg-[#000]/[0.50] px-4 py-2 text-center backdrop-blur-2xl'>
        <span className='text-left font-extrabold capitalize'>{name}</span>
        {rank ? <span className='text-xs font-extrabold'>#{rank}</span> : null}
      </div>
    </div>
  );
};
