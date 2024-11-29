'use client';
import { Button } from '@/components/ui/button';
import PhaseForm from './Form';
import { useForm } from '@tanstack/react-form';
import { TPhaseFormSchema } from '@/types/creators';

const Phase = ({
  form,
  name,
  isFinished,
  phaseNumber,
  isPublic,
  isSameAllocation,
  isUpdatingTanstackArray,
  handleAddNewPhaseConfig,
  handleDeletedPhaseConfig,
  handleToggleIsFinished
}: {
  form: ReturnType<typeof useForm<TPhaseFormSchema>>;
  name: string;
  isFinished: boolean;
  phaseNumber: number;
  isPublic: boolean;
  isSameAllocation: boolean;
  isUpdatingTanstackArray: boolean;
  handleAddNewPhaseConfig: (index: number) => void;
  handleDeletedPhaseConfig: (index: number) => void;
  handleToggleIsFinished: (index: number, isFinished: boolean) => void;
}) => {
  return (
    <div className='flex'>
      <div className='border-3 flex w-28 items-center justify-center border-l border-ob-purple-light'>
        <div className='flex flex-col items-center gap-2'>
          <span className='font-bold'>Phase</span>
          <span className='flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#5E5D5D] text-sm font-bold text-white'>
            {phaseNumber}
          </span>
        </div>
      </div>

      <div className='flex w-full flex-col gap-6'>
        <PhaseForm
          form={form}
          isFinished={isFinished}
          name={name}
          isPublic={isPublic}
          phaseIndex={phaseNumber - 1}
          isSameAllocation={isSameAllocation}
          isUpdatingTanstackArray={isUpdatingTanstackArray}
          handleDeletedPhaseConfig={handleDeletedPhaseConfig}
          handleToggleIsFinished={handleToggleIsFinished}
        />

        <div className='flex w-full flex-col gap-8 rounded-md bg-ob-purple-dark p-8'>
          <Button
            size='sm'
            variant='default'
            className='rounded-md'
            type='button'
            onClick={() => handleAddNewPhaseConfig(phaseNumber - 1)}
          >
            Add Phase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Phase;
