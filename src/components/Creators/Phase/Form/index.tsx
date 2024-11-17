'use client';
import * as v from 'valibot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useState } from 'react';
import FieldInfo from '@/components/common/FieldInfo';
import validate from 'bitcoin-address-validation';
import { FileUpload } from '../../FileUpload';
import { TPhaseDataSchema, TPhaseSchema, phaseSchema } from '../../DeterminePhases';
import { useForm } from '@tanstack/react-form';

const allowListUploadSchema = v.array(v.pipe(v.string(), v.trim()));

enum UploadTypes {
  MANUALL = 1,
  CSV = 2
}

const FinishedForm = ({
  phaseIndex,
  title,
  setIsOpenEdit,
  handleToggleIsFinished,
  data
}: {
  title: string;
  setIsOpenEdit: (isOpen: boolean) => void;
  data: TPhaseSchema | undefined;
  handleToggleIsFinished: (index: number, isFinished: boolean) => void;
  phaseIndex: number;
}) => {
  return (
    <>
      <div className='flex justify-between'>
        <div>{title}</div>
        <button onClick={() => setIsOpenEdit(true)} className='flex cursor-pointer items-center gap-2 xl:hidden'>
          <label className='font-bold'>Edit</label>
          <div className='rounded-sm bg-white p-2'>
            <Image width={10} height={10} src={'/img/creators/pen.svg'} alt='pen' />
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
            <Image width={10} height={10} src={'/img/creators/pen.svg'} alt='pen' />
          </div>
        </button>
      </div>
    </>
  );
};

const EditForm = ({
  phaseIndex,
  title,
  hasWhiteList,
  form,
  handleDeletedPhaseConfig,
  handleFinishForm
}: {
  phaseIndex: number;
  title: string;
  hasWhiteList: boolean;
  form: ReturnType<typeof useForm<TPhaseDataSchema>>;
  handleDeletedPhaseConfig: (index: number) => void;
  handleFinishForm: (newPhase: TPhaseSchema) => void;
}) => {
  const [uploadType, setUploadType] = useState(UploadTypes.MANUALL);

  return (
    <>
      <div className='flex w-full justify-between'>
        <div className='flex items-center gap-2'>
          <label className='font-bold'>{title}</label>
          <div className='rounded-sm bg-white p-2'>
            <Image width={10} height={10} src={'/img/creators/pen.svg'} alt='pen' />
          </div>
        </div>
        <div className='flex gap-6'>
          {hasWhiteList && (
            <div className='flex items-center gap-2'>
              <Input type='checkbox' className='h-6 w-6 accent-white' defaultChecked={true} />
              <label className='font-bold text-ob-grey-lighter'>Allowlist</label>
            </div>
          )}

          <button
            type='button'
            onClick={() => handleDeletedPhaseConfig(phaseIndex)}
            className='rounded-sm bg-white p-2 transition duration-200 hover:bg-ob-white-80'
          >
            <Image width={10} height={10} src={'/img/creators/times.svg'} alt='pen' />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-6 ${hasWhiteList ? 'xl:grid-cols-2' : 'xl:grid-cols-1'} mt-4`}>
        <div className='order-1 grid grid-cols-2 gap-4 xl:order-2'>
          <form.Field
            name={`data[${phaseIndex}].startDate`}
            validators={{
              onChangeListenTo: [`data[${phaseIndex}].endDate`],
              onChange: ({ value, fieldApi }: { value: string; fieldApi: any }) => {
                if (!value) {
                  return 'End date cannot be empty';
                }

                const endDate = new Date(fieldApi.form.getFieldValue(`data[${phaseIndex}].endDate`));

                if (new Date(endDate).getTime() < new Date(value).getTime()) {
                  return 'The start date cannot be in the future than the end date.';
                }

                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm' htmlFor={name}>
                    Start Date
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='date'
                    placeholder='01/12/24'
                    className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`data[${phaseIndex}].endDate`}
            validators={{
              onChangeListenTo: [`data[${phaseIndex}].startDate`],
              onChange: ({ value, fieldApi }: { value: string; fieldApi: any }) => {
                if (!value) {
                  return 'End date cannot be empty';
                }

                const endDate = new Date(value);
                const startDate = new Date(fieldApi.form.getFieldValue(`data[${phaseIndex}].startDate`));
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

                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm' htmlFor={name}>
                    End Date
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='date'
                    placeholder='01/12/24'
                    className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`data[${phaseIndex}].startTime`}
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (!value) {
                  return 'Start Time date cannot be empty';
                }
                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm' htmlFor={name}>
                    Start Time
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='time'
                    placeholder='00:00'
                    className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`data[${phaseIndex}].endTime`}
            validators={{
              onChange: ({ value }: { value: string }) => {
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
                  <label className='text-sm' htmlFor={name}>
                    End Time
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='time'
                    placeholder='00:00'
                    className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`data[${phaseIndex}].price`}
            validators={{
              onChange: ({ value }: { value: number }) => {
                if (value === 0) {
                  return 'Price cannot be empty';
                }

                if (value < 0.00000546) {
                  return 'Price should be greater than 0.00000546';
                }

                return undefined;
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm' htmlFor={name}>
                    Price (BTC)
                  </label>
                  <Input
                    id={name}
                    value={state.value || 0}
                    type='number'
                    placeholder='0.001'
                    className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(Number(e.target.value))}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name={`data[${phaseIndex}].allocation`}
            validators={{
              onChange: ({ value }: { value: number }) => {
                if (value === 0) {
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
                  <label className='text-sm' htmlFor={name}>
                    Allocation Limit
                  </label>
                  <Input
                    id={name}
                    value={state.value || 0}
                    type='number'
                    placeholder='5'
                    className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(Number(e.target.value))}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>
        {hasWhiteList && (
          <div className='order-2 flex flex-col gap-3 xl:order-1'>
            <div>Upload / Enter Addresses</div>

            <div className='mt-1 flex gap-2'>
              <Button
                type='button'
                onClick={() => setUploadType(UploadTypes.MANUALL)}
                variant={uploadType === UploadTypes.MANUALL ? 'secondary' : 'default'}
                size={'sm'}
                className='rounded-md'
              >
                Enter Manually
              </Button>
              <Button
                type='button'
                onClick={() => setUploadType(UploadTypes.CSV)}
                variant={uploadType === UploadTypes.CSV ? 'secondary' : 'default'}
                size={'sm'}
                className='rounded-md'
              >
                Upload CSV
              </Button>
            </div>

            <div className='flex w-full flex-col gap-2'>
              <form.Field
                name={`data[${phaseIndex}].allowList`}
                validators={{
                  onChangeAsyncDebounceMs: 1000,
                  onChangeAsync: async ({ value }: { value: string }) => {
                    if (!value) {
                      return 'BTC address cannot be empty';
                    }

                    const addresses = value
                      .trim()
                      .split('\n')
                      .flatMap((line) => line.split(',').map((part) => part.trim()))
                      .filter((address) => address);

                    for (const address of addresses) {
                      const isValidBTCAddress = await validate(address.trim());
                      if (!isValidBTCAddress) {
                        return 'Invalid BTC address is included';
                      }
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
                            className='w-full border-none bg-ob-grey-light px-5 py-5 outline-none'
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
                            acceptFileType={'text/csv'}
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

            <div className='flex items-center gap-2'>
              <Input type='checkbox' className='h-6 w-6 accent-white' defaultChecked={true} />
              <label className='font-bold text-ob-grey-lighter'>Same allocation for all adresses? </label>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={() => {
          handleFinishForm(form.state.values.data[phaseIndex]);
        }}
        type='button'
        size={'lg'}
        variant={'secondary'}
        className='mt-6 font-bold'
      >
        Done
      </Button>
    </>
  );
};

const PhaseForm = ({
  form,
  isFinished,
  title,
  hasWhiteList,
  phaseIndex,
  handleDeletedPhaseConfig,
  handleToggleIsFinished
}: {
  form: ReturnType<typeof useForm<TPhaseDataSchema>>;
  isFinished: boolean;
  title: string;
  hasWhiteList: boolean;
  phaseIndex: number;
  handleDeletedPhaseConfig: (index: number) => void;
  handleToggleIsFinished: (index: number, isFinished: boolean) => void;
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(!isFinished);
  const [phase, setPhase] = useState<TPhaseSchema>();

  const handleFinishForm = (newPhase: TPhaseSchema) => {
    try {
      const today = new Date();
      const endDate = new Date(newPhase.endDate);
      const startDate = new Date(newPhase.startDate);

      today.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);

      if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
        return console.log('The start date cannot be in the future than the end date.');
      }

      if (new Date(endDate).getTime() < new Date(today).getTime()) {
        return console.log('The start date cannot be in the past');
      }

      if (hasWhiteList && !newPhase.allowList) {
        return console.log('White list can not be empty');
      }
      const parsedData = v.parse(phaseSchema, newPhase);

      setPhase(parsedData);
      handleToggleIsFinished(phaseIndex, true);
      setIsOpenEdit(false);
    } catch (error) {}
  };

  return (
    <div className='flex w-full flex-col gap-8 rounded-md bg-ob-black-light p-8'>
      {isOpenEdit ? (
        <EditForm
          phaseIndex={phaseIndex}
          title={title}
          hasWhiteList={hasWhiteList}
          form={form}
          handleDeletedPhaseConfig={handleDeletedPhaseConfig}
          handleFinishForm={handleFinishForm}
        />
      ) : (
        <FinishedForm
          phaseIndex={phaseIndex}
          handleToggleIsFinished={handleToggleIsFinished}
          title={title}
          setIsOpenEdit={setIsOpenEdit}
          data={form.state.values.data[phaseIndex]}
        />
      )}
    </div>
  );
};

export default PhaseForm;
