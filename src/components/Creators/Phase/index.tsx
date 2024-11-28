'use client';
import { Button } from '@/components/ui/button';
import PhaseForm from './Form';
import { v4 as uuidv4 } from 'uuid';
import { TPhaseConfig } from '../Launchpad';
import { TPhaseDataSchema } from '../DeterminePhases';
import { useForm } from '@tanstack/react-form';

const Phase = ({
  form,
  isFinished,
  phaseNumber,
  title,
  hasWhiteList,
  hasAddPhase,
  handleAddNewPhaseConfig,
  handleDeletedPhaseConfig,
  handleToggleIsFinished
}: {
  title: string;
  isFinished: boolean;
  phaseNumber: number;
  hasWhiteList: boolean;
  hasAddPhase: boolean;
  form: ReturnType<typeof useForm<TPhaseDataSchema>>;
  handleAddNewPhaseConfig: (index: number, newConfig: TPhaseConfig) => void;
  handleDeletedPhaseConfig: (index: number) => void;
  handleToggleIsFinished: (index: number, isFinished: boolean) => void;
}) => {
  return (
    <div className='flex'>
      <div className='border-3 flex w-28 items-center justify-center border-l border-ob-grey-light'>
        <div className='flex flex-col items-center gap-2'>
          <span className='font-bold'>Phase</span>
          <span
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#5E5D5D] text-sm font-bold text-white`}
          >
            {phaseNumber}
          </span>
        </div>
      </div>

      <div className='flex w-full flex-col gap-6'>
        <PhaseForm
          form={form}
          isFinished={isFinished}
          title={title}
          hasWhiteList={hasWhiteList}
          phaseIndex={phaseNumber - 1}
          handleDeletedPhaseConfig={handleDeletedPhaseConfig}
          handleToggleIsFinished={handleToggleIsFinished}
        />

        {hasAddPhase && (
          <div
            onClick={() =>
              handleAddNewPhaseConfig(phaseNumber - 1, {
                hasWhiteList: true,
                title: 'Whitelist',
                hasAddPhase: true,
                uuid: uuidv4(),
                isFinished: false
              })
            }
            className='flex w-full flex-col gap-8 rounded-md bg-ob-black-light p-8'
          >
            <Button size={'sm'} variant={'secondary'}>
              Add Phase
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Phase;
