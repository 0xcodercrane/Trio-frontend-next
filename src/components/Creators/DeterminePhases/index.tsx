'use client';

import { Loading } from '@/components/common';
import { Button } from '@/components/ui/button';
import { ESteps } from '@/types/creators';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import Phase from '../Phase';

export const DeterminePhases = ({ form, setStep }: { form: any; setStep: (step: number) => void }) => {
  const [isUpdatingTanstackArray, setIsUpdatingTanstackArray] = useState(false);

  const handleAddNewPhaseConfig = (index: number) => {
    try {
      const newPhase = {
        name: 'Whitelist  Sale',
        price: 0,
        allocation: 1,
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        isPublic: false,
        isSameAllocation: true,
        isFinished: false,
        allowList: '',
        uuid: uuidv4()
      };

      setIsUpdatingTanstackArray(true);
      form.insertFieldValue('phases', index + 1, newPhase);
      setTimeout(() => setIsUpdatingTanstackArray(false), 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletedPhaseConfig = (index: number) => {
    if (form.state.values.phases.length === 1) {
      return toast.error('You must have at least one phase');
    }

    try {
      setIsUpdatingTanstackArray(true);
      form.removeFieldValue('phases', index);
      setTimeout(() => setIsUpdatingTanstackArray(false), 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleIsFinished = (index: number, isFinished: boolean) => {
    setIsUpdatingTanstackArray(true);
    form.replaceFieldValue('phases', index, { ...form.state.values.phases[index], isFinished });
    setTimeout(() => setIsUpdatingTanstackArray(false), 0);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className='flex w-full flex-col gap-12 rounded-md bg-ob-purple-darkest text-white'
    >
      <div className='flex flex-col gap-12'>
        <form.Field name='phases' mode='array'>
          {(field: any) => (
            <>
              {field.state.value.map((phase: any, index: number) => {
                return (
                  <Phase
                    key={phase.uuid + index}
                    form={form}
                    name={phase.name}
                    phaseNumber={index + 1}
                    isPublic={phase.isPublic}
                    isFinished={phase.isFinished}
                    isSameAllocation={phase.isSameAllocation}
                    isUpdatingTanstackArray={isUpdatingTanstackArray}
                    handleAddNewPhaseConfig={handleAddNewPhaseConfig}
                    handleDeletedPhaseConfig={handleDeletedPhaseConfig}
                    handleToggleIsFinished={handleToggleIsFinished}
                  />
                );
              })}
            </>
          )}
        </form.Field>
      </div>

      <div className='mt-16 flex justify-center gap-2'>
        <Button
          onClick={() => setStep(ESteps.INSCRIPTIONS)}
          type='button'
          variant='default'
          className='min-w-52 rounded-md'
          size='lg'
        >
          Previous
        </Button>
        <form.Subscribe
          selector={(state: any) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]: any) => (
            <Button
              type='submit'
              disabled={!canSubmit || isSubmitting}
              variant='default'
              className='min-w-52 gap-2 rounded-md'
              size='lg'
            >
              {isSubmitting ? <Loading size={32} /> : 'Next'}
            </Button>
          )}
        />
      </div>
    </form>
  );
};
