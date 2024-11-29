import Image from 'next/image';
import { useState } from 'react';
import * as v from 'valibot';
import FieldInfo from '@/components/common/FieldInfo';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '../../forms/common/FileUpload';
import {
  ESteps,
  InscriptionDisplayTypes,
  inscriptionFormSchema,
  InscriptionInputTypes,
  TInscriptionFormSchema
} from '@/types/creators';

export const ChooseInscriptions = ({
  setStep,
  form,
  uploadTab,
  setUploadTab
}: {
  setStep: (step: number) => void;
  form: any;
  uploadTab: InscriptionInputTypes;
  setUploadTab: (tab: InscriptionInputTypes) => void;
}) => {
  const [inscriptioinTab, setInscriptionTab] = useState<InscriptionDisplayTypes>(InscriptionDisplayTypes.ID_NAME_ATTRIBUTES);
  const [inscriptiondata, setInscriptionData] = useState<TInscriptionFormSchema['inscriptions']>(
    form.state.values.inscriptions
  );

  const renderInscriptionDisplayContent = () => {
    if (inscriptioinTab === InscriptionDisplayTypes.ID_NAME_ATTRIBUTES) {
      return (
        <pre className='text-xs text-ob-grey-lighter'>
          {inscriptiondata?.length ? JSON.stringify(form.state.values.inscriptions, null, 2) : ''}
        </pre>
      );
    } else if (inscriptioinTab === InscriptionDisplayTypes.ID_NAME) {
      const data = inscriptiondata?.map((i: TInscriptionFormSchema['inscriptions'][0]) => ({
        id: i.id,
        name: i.meta?.name
      }));
      return <pre className='text-xs text-ob-grey-lighter'>{data?.length ? JSON.stringify(data, null, 2) : ''}</pre>;
    } else {
      const data = inscriptiondata?.map((i: TInscriptionFormSchema['inscriptions'][0]) => ({
        id: i.id
      }));
      return <pre className='text-xs text-ob-grey-lighter'>{data?.length ? JSON.stringify(data, null, 2) : ''}</pre>;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className='w-full text-white'
    >
      <div className='flex flex-col gap-8 rounded-md bg-ob-purple-dark p-8'>
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
                onClick={() => setInscriptionTab(InscriptionDisplayTypes.ID_NAME_ATTRIBUTES)}
                className={`${InscriptionDisplayTypes.ID_NAME_ATTRIBUTES === inscriptioinTab ? 'bg-ob-purple' : 'bg-ob-purple-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-purple`}
              >
                Inscription IDs, name & attributes
              </div>
              <div
                onClick={() => setInscriptionTab(InscriptionDisplayTypes.ID_NAME)}
                className={`${InscriptionDisplayTypes.ID_NAME === inscriptioinTab ? 'bg-ob-purple' : 'bg-ob-purple-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-purple`}
              >
                Inscription IDs and name
              </div>
              <div
                onClick={() => setInscriptionTab(InscriptionDisplayTypes.ID)}
                className={`${InscriptionDisplayTypes.ID === inscriptioinTab ? 'bg-ob-purple' : 'bg-ob-purple-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-purple`}
              >
                InscirptionIDs only
              </div>
            </div>
            <div className='h-[25rem] overflow-y-auto rounded-b-md bg-ob-purple p-4'>
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
                onClick={() => setUploadTab(InscriptionInputTypes.UPLOAD)}
                className={`${InscriptionInputTypes.UPLOAD === uploadTab ? 'bg-ob-purple' : 'bg-ob-purple-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-purple`}
              >
                Upload JSON
              </div>
              <div
                onClick={() => setUploadTab(InscriptionInputTypes.MANUAL)}
                className={`${InscriptionInputTypes.MANUAL === uploadTab ? 'bg-ob-purple' : 'bg-ob-purple-light/20'} flex min-h-[7.5rem] w-full cursor-pointer items-center justify-center rounded-t-md text-center transition duration-200 hover:bg-ob-purple`}
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

                  const inscriptionIdPattern = /^[a-f0-9]{64}i\d+$/; // Pattern to validate inscription IDs
                  let inscriptionJsonData;

                  try {
                    if (uploadTab === InscriptionInputTypes.MANUAL) {
                      // Attempt to parse the input as JSON
                      try {
                        const data: TInscriptionFormSchema['inscriptions'] = JSON.parse(value);

                        // Validate JSON array structure and ID format
                        data.forEach((i) => {
                          if (!inscriptionIdPattern.test(i.id)) {
                            throw new Error('Invalid inscription ID(s) found.');
                          }
                        });

                        // Parse validated data using schema
                        inscriptionJsonData = v.parse(inscriptionFormSchema.entries.inscriptions, data);
                      } catch (jsonError) {
                        // Handle non-JSON input (manual list format)
                        const filteredData = value
                          .trim()
                          .split(/\n|,/) // Split by newlines or commas
                          .map((id) => id.trim())
                          .filter(Boolean) // Remove empty lines
                          .map((id) => {
                            if (inscriptionIdPattern.test(id)) {
                              return { id };
                            } else {
                              throw new Error('Invalid inscription ID(s) found.');
                            }
                          });

                        // Parse validated data using schema
                        inscriptionJsonData = v.parse(inscriptionFormSchema.entries.inscriptions, filteredData);
                      }
                    } else {
                      // Process JSON input for other upload tabs
                      const data: TInscriptionFormSchema['inscriptions'] = JSON.parse(value);

                      // Validate ID format
                      data.forEach((i) => {
                        if (!inscriptionIdPattern.test(i.id)) {
                          throw new Error('Invalid inscription ID(s) found.');
                        }
                      });

                      // Parse validated data using schema
                      inscriptionJsonData = v.parse(inscriptionFormSchema.entries.inscriptions, data);
                    }

                    // Set parsed data in form and state
                    form.setFieldValue('inscriptions', inscriptionJsonData);
                    setInscriptionData(inscriptionJsonData);
                  } catch (error: any) {
                    // Error handling based on type of error
                    if (error.name === 'SyntaxError') {
                      return 'Invalid JSON format.';
                    } else if (error instanceof v.ValiError) {
                      return `${error.message}.`;
                    } else if (error.message === 'Invalid inscription ID(s) found.') {
                      return error.message;
                    } else {
                      return 'Unexpected error occurred during validation.';
                    }
                  }

                  return undefined; // Validation passed
                }
              }}
              children={(field: any) => {
                const { state, handleChange, handleBlur } = field;
                return (
                  <div className='relative h-[25rem] rounded-b-md bg-ob-purple p-4'>
                    {uploadTab === InscriptionInputTypes.MANUAL ? (
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
                        schema={inscriptionFormSchema.entries.inscriptions}
                        setData={handleChange}
                        acceptFileType='application/json'
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
        <Button
          onClick={() => setStep(ESteps.INFORAMATION)}
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
              className='min-w-52 rounded-md'
              size='lg'
            >
              Next
              {isSubmitting && (
                <Image alt='Uploading' src='/img/creators/loader.png' className='animate-spin' width={20} height={20} />
              )}
            </Button>
          )}
        />
      </div>
    </form>
  );
};
