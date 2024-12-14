'use client';
import FieldInfo from '@/components/common/FieldInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LOW_POSTAGE } from '@/lib/constants';
import { phaseFormSchema, TPhaseFormSchema } from '@/types/creators';
import { useForm } from '@tanstack/react-form';
import validate from 'bitcoin-address-validation';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import * as v from 'valibot';
import { FileUpload } from '../../../forms/common/FileUpload';

const allowListUploadSchema = v.array(v.pipe(v.string(), v.trim()));

enum UploadTypes {
  MANUALL = 1,
  CSV = 2
}

const FinishedForm = ({
  phaseIndex,
  name,
  setIsOpenEdit,
  handleToggleIsFinished,
  data
}: {
  name: string;
  setIsOpenEdit: (isOpen: boolean) => void;
  data: TPhaseFormSchema['phases'][0] | undefined;
  handleToggleIsFinished: (index: number, isFinished: boolean) => void;
  phaseIndex: number;
}) => {
  return (
    <>
      <div className='flex justify-between'>
        <div>{name}</div>
        <button onClick={() => setIsOpenEdit(true)} className='flex cursor-pointer items-center gap-2 xl:hidden'>
          <label className='font-bold'>Edit</label>
          <div className='rounded-sm bg-white p-2'>
            <Image width={10} height={10} src='/img/creators/pen.svg' alt='pen' />
          </div>
        </button>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <div className='grid w-full grid-cols-3 gap-4 xl:grid-cols-7 xl:gap-6'>
          <div>
            <div className='text-sm'>Price (BTC)</div>
            <div className='text-sm text-ob-grey-lighter'>{data?.price}</div>
          </div>
          <div>
            <div className='text-sm'>Allocations</div>
            <div className='text-sm text-ob-grey-lighter'>{data?.allocation}</div>
          </div>
          <div>
            <div className='text-sm'>Start Time</div>
            <div className='text-sm text-ob-grey-lighter'>{data?.startTime}</div>
          </div>
          <div>
            <div className='text-sm'>End Time</div>
            <div className='text-sm text-ob-grey-lighter'>{data?.endTime}</div>
          </div>
          <div>
            <div className='text-sm'>Start Date</div>
            <div className='text-sm text-ob-grey-lighter'>{data?.startDate}</div>
          </div>
          <div>
            <div className='text-sm'>End Date</div>
            <div className='text-sm text-ob-grey-lighter'>{data?.endDate}</div>
          </div>
          <div>
            <div className='text-sm'>Allow List</div>
            <div className='text-sm text-ob-grey-lighter'>Active</div>
          </div>
        </div>
        <button
          type='button'
          onClick={() => {
            handleToggleIsFinished(phaseIndex, false);
            setIsOpenEdit(true);
          }}
          className='hidden cursor-pointer items-center gap-2 xl:flex'
        >
          <label className='font-bold'>Edit</label>
          <div className='rounded-sm bg-white p-2'>
            <Image width={10} height={10} src='/img/creators/pen.svg' alt='pen' />
          </div>
        </button>
      </div>
    </>
  );
};

const EditForm = ({
  form,
  phaseIndex,
  isAllowList,
  isSameAllocation,
  isUpdatingTanstackArray,
  allowSameAllocation,
  setAllowSameAllocation,
  setIsAllowList,
  handleDeletedPhaseConfig,
  handleFinishForm
}: {
  form: ReturnType<typeof useForm<TPhaseFormSchema>>;
  phaseIndex: number;
  isAllowList: boolean;
  isSameAllocation: boolean;
  isUpdatingTanstackArray: boolean;
  allowSameAllocation: boolean;
  setAllowSameAllocation: (same: boolean) => void;
  setIsAllowList: (isAllowList: boolean) => void;
  handleDeletedPhaseConfig: (index: number) => void;
  handleFinishForm: (newPhase: TPhaseFormSchema['phases'][0]) => void;
}) => {
  const [uploadType, setUploadType] = useState(UploadTypes.MANUALL);

  return (
    <>
      <div className='flex w-full justify-between'>
        <div className='flex items-center gap-2'>
          <label className='font-bold'>{isAllowList ? 'Whitelist Sale' : 'Public Sale'}</label>
          <div className='rounded-sm bg-white p-2'>
            <Image width={10} height={10} src='/img/creators/pen.svg' alt='pen' />
          </div>
        </div>
        <div className='flex gap-6'>
          <form.Field
            name={`phases[${phaseIndex}].isPublic`}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex items-center gap-2'>
                  <Input
                    id={name}
                    type='checkbox'
                    className='h-6 w-6 accent-white'
                    checked={!state.value}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setIsAllowList(e.target.checked);
                      handleChange(!e.target.checked);
                      if (e.target.checked) {
                        form.setFieldValue(`phases[${phaseIndex}].name`, 'Whitelist Sale');
                      } else {
                        form.setFieldValue(`phases[${phaseIndex}].name`, 'Public Sale');
                      }
                    }}
                  />
                  <label className='font-bold text-ob-grey-lighter' htmlFor={name}>
                    Allowlist
                  </label>
                </div>
              );
            }}
          />

          <button
            type='button'
            onClick={() => handleDeletedPhaseConfig(phaseIndex)}
            className='rounded-sm bg-white p-2 transition duration-200 hover:bg-ob-white-80'
          >
            <Image width={10} height={10} src='/img/creators/times.svg' alt='pen' />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-6 ${isAllowList ? 'xl:grid-cols-2' : 'xl:grid-cols-1'} mt-4`}>
        <div className='order-1 grid grid-cols-2 gap-4 xl:order-2'>
          <form.Field
            name={`phases[${phaseIndex}].startDate`}
            validators={{
              onBlurListenTo: [`phases[${phaseIndex - 1}].endDate`, `phases[${phaseIndex - 1}].endTime`],
              onChangeListenTo: [`phases[${phaseIndex}].endDate`, `phases[${phaseIndex}].startTime`],
              onChange: ({ value, fieldApi }: { value: string; fieldApi: any }) => {
                if (isUpdatingTanstackArray) {
                  return undefined;
                }

                if (!value) {
                  return 'Start date cannot be empty.';
                }

                const startDate = new Date(value);
                const rawStartTime = fieldApi.form.getFieldValue(`phases[${phaseIndex}].startTime`);

                const rawEndDate = fieldApi.form.getFieldValue(`phases[${phaseIndex}].endDate`);
                const endDate = rawEndDate ? new Date(rawEndDate) : null;

                if (endDate && endDate.getTime() < startDate.getTime()) {
                  return 'The start date cannot be later than the end date of the current phase.';
                }

                if (phaseIndex > 0) {
                  if (rawStartTime) {
                    const [hours, minutes] = rawStartTime.split(':').map((t: string) => (Number(t) ? Number(t) : 0));
                    startDate.setHours(hours, minutes, 0, 0);
                  }

                  const rawPrevEndDate = fieldApi.form.getFieldValue(`phases[${phaseIndex - 1}].endDate`);
                  const rawPrevEndTime = fieldApi.form.getFieldValue(`phases[${phaseIndex - 1}].endTime`);
                  const prevPhaseEndDate = rawPrevEndDate ? new Date(rawPrevEndDate) : null;

                  if (prevPhaseEndDate && rawPrevEndTime) {
                    const [hours, minutes] = rawPrevEndTime.split(':').map((t: string) => (Number(t) ? Number(t) : 0));
                    prevPhaseEndDate.setHours(hours, minutes, 0, 0);
                  }

                  if (prevPhaseEndDate && prevPhaseEndDate.getTime() > startDate.getTime()) {
                    return 'The start date of the current phase must be after the end date of the previous phase.';
                  }
                }

                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    Start Date
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='date'
                    placeholder='01/12/24'
                    className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`phases[${phaseIndex}].endDate`}
            validators={{
              onChangeListenTo: [`phases[${phaseIndex}].startDate`],
              onChange: ({ value, fieldApi }: { value: string; fieldApi: any }) => {
                if (isUpdatingTanstackArray) {
                  return undefined;
                }

                if (!value) {
                  return 'End date cannot be empty';
                }

                const endDate = new Date(value);
                const startDate = new Date(fieldApi.form.getFieldValue(`phases[${phaseIndex}].startDate`));
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);

                if (endDate.getTime() < today.getTime()) {
                  return 'End date cannot be in the past';
                }

                startDate.setHours(0, 0, 0, 0);

                if (startDate.getTime() > endDate.getTime()) {
                  return 'End date cannot be in the past than start date';
                }

                const oneDayInMillis = 24 * 60 * 60 * 1000;
                if (endDate.getTime() - startDate.getTime() < oneDayInMillis) {
                  return 'End date must be at least 1 day later than the start date';
                }

                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    End Date
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='date'
                    placeholder='01/12/24'
                    className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`phases[${phaseIndex}].startTime`}
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (isUpdatingTanstackArray) {
                  return undefined;
                }

                if (!value) {
                  return 'Start time cannot be empty.';
                }

                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    Start Time
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='time'
                    placeholder='00:00'
                    className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`phases[${phaseIndex}].endTime`}
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (isUpdatingTanstackArray) {
                  return undefined;
                }

                if (!value) {
                  return 'End Time date cannot be empty';
                }
                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    End Time
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='time'
                    placeholder='00:00'
                    className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`phases[${phaseIndex}].price`}
            validators={{
              onChange: ({ value }: { value: number }) => {
                if (isUpdatingTanstackArray) {
                  return undefined;
                }

                if (!value || value === 0) {
                  return 'Price cannot be empty';
                }

                if (value < LOW_POSTAGE) {
                  return `Price should be greater than ${LOW_POSTAGE} sats`;
                }

                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    Price (BTC)
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='number'
                    placeholder='0.001'
                    className='w-full appearance-none border-none bg-ob-purple px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`phases[${phaseIndex}].allocation`}
            validators={{
              onChange: ({ value }: { value: number }) => {
                if (isUpdatingTanstackArray) {
                  return undefined;
                }

                if (value === 0 || !value) {
                  return 'Allocation cannot be empty';
                }

                if (value < 1) {
                  return 'allocation should be greater than 1';
                }

                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    Allocation Limit
                  </label>
                  <Input
                    id={name}
                    disabled={!allowSameAllocation}
                    value={state.value || ''}
                    type='number'
                    placeholder='5'
                    className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>

        <div className={`order-2 flex-col gap-3 xl:order-1 ${isAllowList ? 'flex' : 'hidden'}`}>
          <div className='text-ob-grey-lightest'>Upload / Enter Addresses</div>

          <div className='mt-1 flex gap-2'>
            <Button
              type='button'
              onClick={() => setUploadType(UploadTypes.MANUALL)}
              variant={uploadType === UploadTypes.MANUALL ? 'secondary' : 'default'}
              size='sm'
              className='rounded-md'
            >
              Enter Manually
            </Button>
            <Button
              type='button'
              onClick={() => setUploadType(UploadTypes.CSV)}
              variant={uploadType === UploadTypes.CSV ? 'secondary' : 'default'}
              size='sm'
              className='rounded-md'
            >
              Upload CSV
            </Button>
          </div>

          <div className='flex w-full flex-col gap-2'>
            <form.Field
              name={`phases[${phaseIndex}].allowList`}
              validators={{
                onChangeAsyncDebounceMs: 1000,
                onChangeListenTo: [`phases[${phaseIndex}].isSameAllocation`],
                onChangeAsync: async ({ value, fieldApi }: { value: string; fieldApi: any }) => {
                  if (isUpdatingTanstackArray || !isAllowList) {
                    return undefined;
                  }

                  if (!value?.trim()) {
                    return 'Allowlist cannot be empty';
                  }

                  const lines = value
                    .trim()
                    .split('\n')
                    .filter((line) => line.trim());

                  const invalidEntries: string[] = [];

                  const isSameAllocation = fieldApi.form.getFieldValue(`phases[${phaseIndex}].isSameAllocation`);

                  for (const line of lines) {
                    // Split address and allocation
                    const [address, allocation] = line.split(',').map((part) => part.trim());

                    // Validate Bitcoin address
                    const isValidBTCAddress = await validate(address);
                    if (!isValidBTCAddress) {
                      invalidEntries.push(`Invalid BTC address: "${address}"`);
                      continue;
                    }

                    // Convert allocation to a number if present
                    const allocationNumber = Number(allocation);

                    /// Handle missing allocation when required
                    if (!isSameAllocation && !allocation) {
                      invalidEntries.push(`Missing allocation for address "${address}"`);
                      continue;
                    }

                    // Validate allocation if present
                    if (
                      allocation &&
                      (!Number.isInteger(allocationNumber) || allocationNumber < 1 || isNaN(allocationNumber))
                    ) {
                      invalidEntries.push(`Invalid allocation for address "${address}": "${allocation}"`);
                      continue;
                    }
                  }

                  // If there are any invalid entries, return error message
                  if (invalidEntries.length > 0) {
                    return invalidEntries.join('\n');
                  }

                  return undefined;
                }
              }}
              children={(field: any) => {
                const { state, handleBlur, handleChange } = field;

                return (
                  <>
                    {uploadType === UploadTypes.MANUALL ? (
                      <>
                        <Textarea
                          value={state.value || ''}
                          placeholder='Enter your addresses separated by commas'
                          className='w-full border-none bg-ob-purple px-5 py-5 outline-none'
                          rows={6}
                          onBlur={handleBlur}
                          onChange={(e) => handleChange(e.target.value)}
                        />
                      </>
                    ) : (
                      <div className='group flex min-h-40 cursor-pointer items-center justify-center rounded-md border-[1px] border-[#FFFFFF33]'>
                        <FileUpload
                          schema={allowListUploadSchema}
                          setData={handleChange}
                          size='sm'
                          acceptFileType='text/csv'
                          accept={['.csv']}
                        />
                      </div>
                    )}
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>

          <form.Field
            name={`phases[${phaseIndex}].isSameAllocation`}
            children={(field: any) => {
              const { state, handleBlur, handleChange } = field;

              return (
                <>
                  <div className='flex items-center gap-2'>
                    <Input
                      checked={state.value || false}
                      onChange={(e) => {
                        setAllowSameAllocation(e.target.checked);
                        handleChange(e.target.checked);
                      }}
                      onBlur={handleBlur}
                      type='checkbox'
                      className='h-6 w-6 accent-white'
                    />
                    <FieldInfo field={field} />
                    <label className='font-bold text-ob-grey-lighter'>Same allocation for all adresses? </label>
                  </div>
                </>
              );
            }}
          />
        </div>
      </div>

      <Button
        onClick={() => {
          handleFinishForm(form.state.values.phases[phaseIndex]);
        }}
        type='button'
        size='lg'
        variant='default'
        className='mt-6 rounded-md font-bold'
      >
        Done
      </Button>
    </>
  );
};

const PhaseForm = ({
  form,
  isFinished,
  name,
  isPublic,
  phaseIndex,
  isSameAllocation,
  isUpdatingTanstackArray,
  handleDeletedPhaseConfig,
  handleToggleIsFinished
}: {
  form: ReturnType<typeof useForm<TPhaseFormSchema>>;
  isFinished: boolean;
  name: string;
  isPublic: boolean;
  phaseIndex: number;
  isSameAllocation: boolean;
  isUpdatingTanstackArray: boolean;
  handleDeletedPhaseConfig: (index: number) => void;
  handleToggleIsFinished: (index: number, isFinished: boolean) => void;
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(!isFinished);
  const [isAllowList, setIsAllowList] = useState<boolean>(!isPublic);
  const [allowSameAllocation, setAllowSameAllocation] = useState<boolean>(isSameAllocation);

  const handleFinishForm = (newPhase: TPhaseFormSchema['phases'][0]) => {
    try {
      const today = new Date();
      const endDate = new Date(newPhase.endDate);
      const startDate = new Date(newPhase.startDate);
      const startTime = newPhase.startTime;

      today.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);

      if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
        return toast.error('The start date cannot be in the future than the end date.');
      }

      if (new Date(endDate).getTime() < new Date(today).getTime()) {
        return toast.error('The start date cannot be in the past');
      }

      const oneDayInMillis = 24 * 60 * 60 * 1000;

      if (endDate.getTime() - startDate.getTime() < oneDayInMillis) {
        return toast.error('End date must be at least 1 day later than the start date.');
      }

      if (!startTime) {
        return toast.error('Start time is required.');
      }

      if (phaseIndex > 0) {
        const rawPrevEndDate = form.state.values.phases[phaseIndex - 1].endDate;
        const rawPrevEndTime = form.state.values.phases[phaseIndex - 1].endTime;
        const prevPhaseEndDate = rawPrevEndDate ? new Date(rawPrevEndDate) : null;

        const [hours, minutes] = startTime.split(':').map((t: string) => (Number(t) ? Number(t) : 0));
        startDate.setHours(hours, minutes, 0, 0);

        if (prevPhaseEndDate && rawPrevEndTime) {
          const [hours, minutes] = rawPrevEndTime.split(':').map((t: string) => (Number(t) ? Number(t) : 0));
          prevPhaseEndDate.setHours(hours, minutes, 0, 0);
        }

        if (prevPhaseEndDate && prevPhaseEndDate.getTime() > startDate.getTime()) {
          return toast.error('The start date of the current phase must be after the end date of the previous phase.');
        }
      }

      if (isAllowList && !newPhase.allowList?.trim()) {
        return toast.error('White list can not be empty.');
      }

      v.parse(phaseFormSchema.entries.phases.item, {
        ...newPhase,
        price: Number(newPhase.price),
        allocation: Number(newPhase.allocation)
      });
      setIsOpenEdit(false);
      handleToggleIsFinished(phaseIndex, true);
    } catch (error: any) {
      if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error(error.toString());
      }
    }
  };

  return (
    <div className='flex w-full flex-col gap-8 rounded-md bg-ob-purple-dark p-8'>
      {isOpenEdit ? (
        <EditForm
          phaseIndex={phaseIndex}
          form={form}
          isAllowList={isAllowList}
          isSameAllocation={isSameAllocation}
          isUpdatingTanstackArray={isUpdatingTanstackArray}
          allowSameAllocation={allowSameAllocation}
          setAllowSameAllocation={setAllowSameAllocation}
          setIsAllowList={setIsAllowList}
          handleDeletedPhaseConfig={handleDeletedPhaseConfig}
          handleFinishForm={handleFinishForm}
        />
      ) : (
        <FinishedForm
          phaseIndex={phaseIndex}
          handleToggleIsFinished={handleToggleIsFinished}
          name={name}
          setIsOpenEdit={setIsOpenEdit}
          data={form.state.values.phases[phaseIndex]}
        />
      )}
    </div>
  );
};

export default PhaseForm;
