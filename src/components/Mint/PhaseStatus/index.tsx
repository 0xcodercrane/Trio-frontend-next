import { TimeLeft } from '@/components/common';
import { satsToBitcoin } from '@/lib/utilities';
import { EPhaseState, TAllocation, TPhase, TPhaseStatusProps } from '@/types/launchpad';
import Image from 'next/image';
import numeral from 'numeral';
import React from 'react';

const mapInscriptionsRemainingToContent = (inscriptionsRemaining: number) => {
  switch (inscriptionsRemaining) {
    case -1:
      return 'Unlimited Allocations Remaining';
    case 1:
      return `${inscriptionsRemaining} Allocation Remaining`;
    case 0:
      return `${inscriptionsRemaining} Allocation Remaining`;
    default:
      return `${inscriptionsRemaining} Allocations Remaining`;
  }
};

const mapStateToColor = (state: EPhaseState) => {
  switch (state) {
    case EPhaseState.ENDED:
      return 'ob-red';
    case EPhaseState.LIVE:
      return 'ob-green-light';
    case EPhaseState.UPCOMING:
      return 'ob-yellow';
    default:
      return 'text-black';
  }
};

const mapPhaseToState = (phase: TPhase): EPhaseState => {
  const now = Date.now();
  if (now > phase.end_date * 1000) {
    return EPhaseState.ENDED;
  } else if (now >= phase.start_date * 1000 && now <= phase.end_date * 1000) {
    return EPhaseState.LIVE;
  } else {
    return EPhaseState.UPCOMING;
  }
};

const PhaseStatus: React.FC<TPhaseStatusProps> = ({
  metaData,
  launchInfo,
  allocationIsPending,
  allocationInfo,
  isAuthenticated,
  currentPhase
}) => {
  if (!metaData || !launchInfo || !launchInfo.phases.length)
    return (
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 3 }).map((_, key) => (
          <div key={key} className='h-24 animate-pulse rounded-xl bg-ob-black-lightest'></div>
        ))}
      </div>
    );

  return (
    <div className='flex flex-col gap-3'>
      {launchInfo.phases.map((phase: TPhase, index: number) => {
        const { price } = phase;

        const btcPrice = satsToBitcoin(price);
        const state = mapPhaseToState(phase);
        const color = mapStateToColor(state);

        const allocationForPhase: TAllocation | null =
          (!allocationIsPending && allocationInfo?.phases.find((allocation: TAllocation) => allocation.id === phase.id)) ||
          null;

        let inscriptionsRemaining = -1;

        if (!phase.is_public) {
          inscriptionsRemaining = allocationForPhase ? allocationForPhase.remaining_allocation : 0;
        }

        return (
          <div
            key={phase.id}
            className={`relative flex h-24 max-h-24 flex-row justify-between rounded-xl p-[1px] ${
              phase.id !== currentPhase?.id ? 'opacity-60 hover:cursor-not-allowed' : ''
            }`}
          >
            <div
              className={`absolute inset-0 h-full w-full rounded-xl ${
                state === EPhaseState.LIVE ? 'bg-gradient-to-r from-ob-blue to-ob-green' : 'bg-ob-white-20'
              }`}
            ></div>
            <div className='relative flex h-full min-h-[calc(var(--button-height-sm)-2px)] w-full max-w-full flex-row items-center justify-between gap-2 rounded-xl bg-ob-black-lightest px-4 xs:text-sm md:text-base'>
              <div className='max-w-1/2 flex flex-col gap-2'>
                <div className='flex flex-row justify-start gap-2'>
                  <span className='text-lg'>{phase.name || `Phase ${index + 1}`}</span>
                </div>
                <span className='text-sm'>
                  {btcPrice} BTC ({numeral(price).format('0a')} Sats)
                </span>
              </div>

              <div className='max-w-1/2 flex max-h-full flex-col gap-2'>
                <div className='flex flex-row justify-between gap-2'>
                  <span className={`text-${color}`}>
                    {state} {state === EPhaseState.LIVE && <span className='px-2 text-white'>Ends in</span>}
                  </span>
                  <TimeLeft targetTime={state === EPhaseState.LIVE ? phase.end_date : phase.start_date} />
                </div>
                <div className='flex w-full items-center justify-end gap-1 text-right'>
                  {isAuthenticated && (
                    <span
                      className={`block text-right ${state === 'Ended' && inscriptionsRemaining > 0 ? 'line-through' : ''}`}
                    >
                      {mapInscriptionsRemainingToContent(inscriptionsRemaining)}
                    </span>
                  )}
                  {allocationForPhase && !allocationForPhase.is_public ? (
                    <Image src='/img/lock.svg' alt='discord' width={15} height={15} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhaseStatus;
