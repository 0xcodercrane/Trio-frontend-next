import { TMintProcessProps } from '@/types/launchpad';

const MintProcess = ({
  percentComplete,
  launchInfoPending,
  totalInscriptions,
  remainingInscriptions
}: TMintProcessProps) => {
  if (launchInfoPending) {
    return <div className='h-[5px] w-full animate-pulse bg-ob-black-lightest'></div>;
  }

  return (
    <>
      <div className='flex w-full flex-col gap-2'>
        <div className='relative h-[6px] w-full rounded-sm bg-ob-grey-lighter/[0.80]'>
          <div className='absolute h-full rounded-sm bg-ob-green-light' style={{ width: `${percentComplete}%` }}></div>
        </div>
        <div className='flex flex-row justify-between'>
          <span className='text-ob-grey-lightest'>
            Total Minted {totalInscriptions - remainingInscriptions} / {totalInscriptions}
          </span>
          {!launchInfoPending && <span>{percentComplete}%</span>}
        </div>
      </div>
    </>
  );
};

export default MintProcess;
