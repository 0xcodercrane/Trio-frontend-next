import FieldInfo from '@/components/common/FieldInfo';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import * as v from 'valibot';
import { FileUpload } from '../FileUpload';
import { ESteps } from '../Launchpad';

const inscriptionSchema = v.object({
  id: v.pipe(v.string(), v.trim()),
  meta: v.optional(
    v.object({
      attributes: v.optional(
        v.array(
          v.object({
            value: v.pipe(v.string(), v.trim()),
            trait_type: v.pipe(v.string(), v.trim())
          })
        )
      ),
      name: v.pipe(v.string(), v.trim()),
      high_res_img_url: v.optional(v.pipe(v.pipe(v.string(), v.trim()), v.url()))
    })
  )
});

export const inscriptionDataSchema = v.object({
  inscriptions: v.array(inscriptionSchema),
  inscriptionsString: v.pipe(v.string(), v.nonEmpty('Inscription Data can not be empty'))
});

export enum InscriptionTabs {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3
}

export enum UploadTabs {
  FIRST = 1,
  SECOND = 2
}

export type TInscriptionSchema = v.InferInput<typeof inscriptionSchema>;
export type TInscriptionDataSchema = v.InferInput<typeof inscriptionDataSchema>;

export const ChooseInscriptions = ({ setStep, form }: { setStep: (step: number) => void; form: any }) => {
  const [inscriptioinTab, setInscriptionTab] = useState<InscriptionTabs>(InscriptionTabs.FIRST);
  const [uploadTab, setUploadTab] = useState<UploadTabs>(UploadTabs.FIRST);

  const [inscriptiondata, setInscriptionData] = useState<TInscriptionSchema[]>(form.state.values.inscriptions);

  const renderInscriptionDisplayContent = () => {
    if (inscriptioinTab === InscriptionTabs.FIRST) {
      return (
        <pre className='text-xs text-ob-grey-lighter'>
          {inscriptiondata?.length ? JSON.stringify(form.state.values.inscriptions, null, 2) : ''}
        </pre>
      );
    } else if (inscriptioinTab === InscriptionTabs.SECOND) {
      const data = inscriptiondata?.map((i: TInscriptionSchema) => ({
        id: i.id,
        name: i.meta?.name
      }));
      return <pre className='text-xs text-ob-grey-lighter'>{data?.length ? JSON.stringify(data, null, 2) : ''}</pre>;
    } else {
      const data = inscriptiondata?.map((i: TInscriptionSchema) => ({
        id: i.id
      }));
      return <pre className='text-xs text-ob-grey-lighter'>{data?.length ? JSON.stringify(data, null, 2) : ''}</pre>;
    }
  };

  const handleGoToNextStep = () => {
    try {
      v.parse(inscriptionDataSchema, form.state.values);
      form.handleSubmit();
      setStep(ESteps.CHOOSE + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-full rounded-md bg-ob-black-light p-8 text-white'>
        <div className='flex flex-col gap-8'>
          <div className='text-xl'>Example</div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <div>How to format</div>
              <div>
                <p className='text-sm text-ob-grey-lightest'>
                  Please upload your inscriptions list for your Ordinals collection. Please ensure that it&apos;s valid JSON
                  formatting, you can use codebeautify to validate and beautify your payload. Please note: the field below is
                  required, you must have a list of inscriptions in order to submit your application.
                </p>
              </div>
            </div>
            <div>
              <div className='grid grid-cols-3 gap-2'>
                <div
                  onClick={() => setInscriptionTab(InscriptionTabs.FIRST)}
                  className={`${InscriptionTabs.FIRST === inscriptioinTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
                >
                  Inscription IDs, name & attributes
                </div>
                <div
                  onClick={() => setInscriptionTab(InscriptionTabs.SECOND)}
                  className={`${InscriptionTabs.SECOND === inscriptioinTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
                >
                  Inscription IDs and name
                </div>
                <div
                  onClick={() => setInscriptionTab(InscriptionTabs.THIRD)}
                  className={`${InscriptionTabs.THIRD === inscriptioinTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
                >
                  InscirptionIDs only
                </div>
              </div>
              <div className='h-[25rem] overflow-y-auto rounded-b-md bg-ob-grey-light p-4'>
                {renderInscriptionDisplayContent()}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <div>Provide Inscriptions</div>
              <div>
                <p className='text-sm text-ob-grey-lightest'>Please choose between manual & JSON uploads.</p>
              </div>
            </div>

            <div>
              <div className='grid grid-cols-2 gap-2'>
                <div
                  onClick={() => setUploadTab(UploadTabs.FIRST)}
                  className={`${UploadTabs.FIRST === uploadTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
                >
                  Upload JSON
                </div>
                <div
                  onClick={() => setUploadTab(UploadTabs.SECOND)}
                  className={`${UploadTabs.SECOND === uploadTab ? 'bg-ob-grey-light' : 'bg-ob-grey-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-grey-light`}
                >
                  Enter Manually
                </div>
              </div>

              <form.Field
                name='inscriptionsString'
                validators={{
                  onChangeAsyncDebounceMs: 1000,
                  onChange: ({ value }: { value: string }) => {
                    if (!value) {
                      return 'Inscription data address cannot be empty';
                    }

                    const inscriptionIdPattern = /^[a-f0-9]{64}i\d+$/;
                    let inscriptionJsonData;

                    try {
                      if (uploadTab === UploadTabs.SECOND) {
                        const filteredData = value
                          .trim()
                          .split('\n')
                          .flatMap((line) => line.split(',').map((part) => part.trim()))
                          .filter((id) => id)
                          .map((id) => {
                            if (inscriptionIdPattern.test(id)) {
                              return { id: id };
                            } else {
                              throw new Error('Invalid inscription ID(s) found.');
                            }
                          });

                        inscriptionJsonData = v.parse(inscriptionDataSchema.entries.inscriptions, filteredData);
                      } else {
                        const data: TInscriptionSchema[] = JSON.parse(value);

                        data.map((i) => {
                          if (!inscriptionIdPattern.test(i.id)) {
                            throw new Error('Invalid inscription ID(s) found.');
                          }
                        });

                        inscriptionJsonData = v.parse(inscriptionDataSchema.entries.inscriptions, data);
                      }

                      form.setFieldValue('inscriptions', inscriptionJsonData);
                      setInscriptionData(inscriptionJsonData);
                    } catch (error: any) {
                      form.setFieldValue('inscriptions', []);
                      form.setFieldValue('inscriptionsString', '');
                      if (error?.name === 'SyntaxError') {
                        return 'Invalid JSON format.';
                      } else if (error instanceof v.ValiError) {
                        return `${error.message}.`;
                      } else if (error.message === 'Invalid inscription ID(s) found.') {
                        return error.message;
                      } else {
                        return 'Invalid JSON format.';
                      }
                    }
                    return undefined;
                  }
                }}
                children={(field: any) => {
                  const { state, handleChange, handleBlur } = field;
                  return (
                    <div className='relative h-[25rem] rounded-b-md bg-ob-grey-light p-4'>
                      {uploadTab === UploadTabs.SECOND ? (
                        <>
                          <Textarea
                            value={state.value || ''}
                            placeholder='Enter your inscription IDs separated by commas.'
                            onChange={(e) => handleChange(e.target.value)}
                            rows={18}
                            onBlur={handleBlur}
                            className='text-gray-lighter h-full rounded-md border-none bg-transparent text-sm text-ob-grey-lighter'
                          />
                        </>
                      ) : (
                        <FileUpload
                          schema={inscriptionDataSchema.entries.inscriptions}
                          setData={handleChange}
                          acceptFileType={'application/json'}
                          accept={['.json']}
                          size='lg'
                        />
                      )}
                      <div className='absolute -bottom-8 left-6'>
                        <FieldInfo field={field} />
                      </div>
                    </div>
                  );
                }}
              ></form.Field>
            </div>
          </div>
        </div>

        <div className='mt-16 flex justify-center gap-2'>
          <Button onClick={() => setStep(ESteps.CHOOSE - 1)} type='button' variant='secondary' size='lg'>
            Previous
          </Button>
          <Button onClick={() => handleGoToNextStep()} type='button' variant='secondary' size='lg'>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
