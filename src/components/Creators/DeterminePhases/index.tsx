'use client';
import * as v from 'valibot';
import { Button } from '@/components/ui/button';
import Phase from '../Phase';
import { ESteps, TPhaseConfig } from '../Launchpad';
import { v4 as uuidv4 } from 'uuid';
import { FormApi } from '@tanstack/react-form';

export const phaseSchema = v.object({
  price: v.pipe(v.number(), v.minValue(0.00000546, 'Price cannot be empty')),
  allocation: v.pipe(v.number(), v.minValue(1, 'Allocation cannot be empty')),
  startDate: v.pipe(v.string(), v.nonEmpty('Start date cannot be empty')),
  endDate: v.pipe(v.string(), v.nonEmpty('End date cannot be empty')),
  startTime: v.pipe(v.string(), v.nonEmpty('Start time cannot be empty')),
  endTime: v.pipe(v.string(), v.nonEmpty('End time cannot be empty')),
  allowList: v.optional(v.string())
});

export const phaseDataSchema = v.object({
  data: v.array(phaseSchema)
});

export type TPhaseDataSchema = v.InferInput<typeof phaseDataSchema>;
export type TPhaseSchema = v.InferInput<typeof phaseSchema>;

export const DeterminePhases = ({
  form,
  phaseConfig,
  setStep,
  handleSubmitProject,
  setPhaseConfigData
}: {
  form: any;
  phaseConfig: TPhaseConfig[];
  setStep: (step: number) => void;
  handleSubmitProject: () => void;
  setPhaseConfigData: (newConfig: TPhaseConfig[]) => void;
}) => {
  const handleAddNewPhaseConfig = (index: number, newConfig: TPhaseConfig) => {
    try {
      form.insertFieldValue('data', index + 1, {
        price: 0,
        allocation: 0,
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        allowList: ''
      });

      const updatedConfig: TPhaseConfig[] = [...phaseConfig.slice(0, index + 1), newConfig, ...phaseConfig.slice(index + 1)];
      setPhaseConfigData(updatedConfig);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletedPhaseConfig = (index: number) => {
    try {
      form.removeFieldValue('data', index);
      const updatedConfig: TPhaseConfig[] = [...phaseConfig.slice(0, index), ...phaseConfig.slice(index + 1)];
      setPhaseConfigData(updatedConfig);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleIsFinished = (index: number, isFinished: boolean) => {
    const updatedConfig: TPhaseConfig[] = [...phaseConfig];
    if (updatedConfig[index]) {
      updatedConfig[index] = {
        ...updatedConfig[index],
        isFinished: isFinished
      };
    }

    setPhaseConfigData(updatedConfig);
  };

  const handleGoToNextStep = () => {
    try {
      v.parse(phaseDataSchema, form.state.values);
      setStep(ESteps.DETERMINE + 1);
      handleSubmitProject();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex w-full flex-col gap-12 rounded-md bg-ob-black text-white'>
      <div className='flex flex-col gap-12'>
        <form.Field name='data' mode='array'>
          {(field: any) => (
            <>
              {field.state.value.map((_: any, index: number) => {
                return (
                  <Phase
                    key={phaseConfig[index]?.uuid + index}
                    form={form}
                    isFinished={phaseConfig[index]?.isFinished}
                    phaseNumber={index + 1}
                    title={phaseConfig[index]?.title}
                    hasWhiteList={phaseConfig[index]?.hasWhiteList}
                    hasAddPhase={phaseConfig[index]?.hasAddPhase}
                    handleAddNewPhaseConfig={handleAddNewPhaseConfig}
                    handleDeletedPhaseConfig={handleDeletedPhaseConfig}
                    handleToggleIsFinished={handleToggleIsFinished}
                  />
                );
              })}
              {!field.state.value.length ? (
                <div className='flex items-center justify-center'>
                  <Button
                    onClick={() => {
                      handleAddNewPhaseConfig(0, {
                        hasWhiteList: true,
                        title: 'Whitelist',
                        hasAddPhase: true,
                        uuid: uuidv4(),
                        isFinished: false
                      });
                    }}
                    size={'lg'}
                    variant={'secondary'}
                    type='button'
                  >
                    Add Phase
                  </Button>
                </div>
              ) : (
                ''
              )}
            </>
          )}
        </form.Field>
      </div>

      <div className='mt-16 flex justify-center gap-2'>
        <Button onClick={() => setStep(ESteps.DETERMINE - 1)} type='button' variant='secondary' size='lg'>
          Previous
        </Button>
        <Button onClick={() => handleGoToNextStep()} type='button' variant='secondary' size='lg'>
          Next
        </Button>
      </div>
    </div>
  );
};
