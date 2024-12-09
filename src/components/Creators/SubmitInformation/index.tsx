import FieldInfo from '@/components/common/FieldInfo';
import { validate, Network } from 'bitcoin-address-validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { validateImage } from '@/lib/utilities/validateImage';
import { FileUpload } from '../../forms/common/FileUpload';
import { ESteps, informationFormSchema, PLACE_HOLDER } from '@/types/creators';
import * as v from 'valibot';
import { ENETWORK, NETWORK } from '@/lib/constants';
import { getEntireCollectionBySlug } from '@/lib/supabase';
import { Loading } from '@/components/common';

export const SubmitInformation = ({
  form,
  bannerPreview,
  thumbnailPreview,
  setStep,
  setBannerPreview,
  setThumbnailPreview
}: {
  form: any;
  bannerPreview: string | null | undefined;
  thumbnailPreview: string | null | undefined;
  setStep: (step: number) => void;
  setBannerPreview: (preview: string | null | undefined) => void;
  setThumbnailPreview: (preview: string | null | undefined) => void;
}) => {
  const validateCollectionNameAndUniqueSlug = async (name: string): Promise<string | undefined> => {
    try {
      // Validate collection name against the schema
      v.parse(informationFormSchema.entries.name, name);
    } catch (error) {
      return error instanceof Error ? error.message : 'Invalid collection name';
    }

    // Generate slug from collection name
    const slug = name.trim().toLowerCase().replace(/\s+/g, '-');

    try {
      const res: { data: Array<any> | null } = await getEntireCollectionBySlug(slug);

      // Check if slug is already in use
      if (res?.data?.length) {
        return 'Collection name is already taken.';
      }

      return undefined; // Name is valid and slug is unique
    } catch (error) {
      return error instanceof Error ? error.message : 'Error validating collection slug';
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
      <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8'>
        <div className='flex w-full flex-col gap-4 rounded-md bg-ob-purple-dark p-8'>
          <form.Field
            name='name'
            validators={{
              onChangeAsyncDebounceMs: 1000,
              onChangeAsync: async ({ value }: { value: string }) => {
                if (value) {
                  return await validateCollectionNameAndUniqueSlug(value);
                }
              },
              onsubmit: async ({ value }: { value: string }) => {
                if (value) {
                  return await validateCollectionNameAndUniqueSlug(value);
                }
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    Collection Name
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='text'
                    placeholder={PLACE_HOLDER}
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
            name='description'
            validators={{
              onChange: informationFormSchema.entries.description
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;
              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    Collection Description
                  </label>
                  <Textarea
                    id={name}
                    value={state.value || ''}
                    placeholder={PLACE_HOLDER}
                    className='w-full border-none bg-ob-purple px-5 py-5 outline-none'
                    rows={6}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <form.Field
            name='website_link'
            validators={{
              onChange: informationFormSchema.entries.website_link
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    Website
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='text'
                    placeholder={PLACE_HOLDER}
                    className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <div className='grid grid-cols-2 gap-2'>
            <form.Field
              name='twitter_link'
              validators={{
                onChange: informationFormSchema.entries.twitter_link
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                      X Handle
                    </label>
                    <div className='flex items-center rounded-md bg-ob-purple'>
                      <Input
                        id={name}
                        value={state.value || ''}
                        type='text'
                        placeholder={PLACE_HOLDER}
                        className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <Button size='sm' variant='secondary' className='mr-5 hidden text-xs'>
                        Connect
                      </Button>
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name='discord_link'
              validators={{
                onChange: informationFormSchema.entries.discord_link
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                      Discord Handle
                    </label>
                    <div className='flex items-center rounded-md bg-ob-purple'>
                      <Input
                        id={name}
                        value={state.value || ''}
                        type='text'
                        placeholder={PLACE_HOLDER}
                        className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <Button size='sm' variant='secondary' className='mr-5 hidden text-xs'>
                        Connect
                      </Button>
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name='telegram_link'
              validators={{
                onChange: informationFormSchema.entries.telegram_link
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                      Telegram Handle
                    </label>
                    <div className='flex items-center rounded-md bg-ob-purple'>
                      <Input
                        id={name}
                        value={state.value || ''}
                        type='text'
                        placeholder={PLACE_HOLDER}
                        className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <Button size='sm' variant='secondary' className='mr-5 hidden text-xs'>
                        Connect
                      </Button>
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name='instagram_link'
              validators={{
                onChange: informationFormSchema.entries.instagram_link
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                      Instagram Handle
                    </label>
                    <div className='flex items-center rounded-md bg-ob-purple'>
                      <Input
                        id={name}
                        value={state.value || ''}
                        type='text'
                        placeholder={PLACE_HOLDER}
                        className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <Button size='sm' variant='secondary' className='mr-5 hidden text-xs'>
                        Connect
                      </Button>
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>
        </div>

        <div className='flex flex-col gap-4 rounded-md bg-ob-purple-dark p-8'>
          <div className='grid grid-cols-2 gap-2'>
            <form.Field
              name='creator_name'
              validators={{
                onChange: informationFormSchema.entries.creator_name
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                      Creator Handle
                    </label>
                    <Input
                      id={name}
                      value={state.value || ''}
                      type='text'
                      placeholder={PLACE_HOLDER}
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
              name='creator_email'
              validators={{
                onChange: informationFormSchema.entries.creator_email
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                      Creator Email
                    </label>
                    <Input
                      id={name}
                      value={state.value || ''}
                      type='text'
                      placeholder={PLACE_HOLDER}
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

          <form.Field
            name='creator_btc_address'
            validators={{
              onChangeAsync: async ({ value }: { value: string }) => {
                let network = Network.mainnet;
                if ([ENETWORK.SIGNET, ENETWORK.TESTNET].includes(NETWORK)) network = Network.testnet;
                const isValidAddress = validate(value, network);
                return isValidAddress ? undefined : 'Invalid BTC address';
              }
            }}
            children={(field: any) => {
              const { state, name, handleBlur, handleChange } = field;

              return (
                <div className='flex w-full flex-col gap-1'>
                  <label className='text-sm text-ob-grey-lightest' htmlFor={name}>
                    Creator BTC Address
                  </label>
                  <Input
                    id={name}
                    value={state.value || ''}
                    type='text'
                    placeholder={PLACE_HOLDER}
                    className='w-full border-none bg-ob-purple px-5 py-7 outline-none'
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />

          <div className='grid grid-cols-1 gap-2 xl:grid-cols-2'>
            <form.Field
              name='icon'
              validators={{
                onChangeAsync: async ({ value }: { value: File }) => {
                  if (!value) {
                    return 'Icon is required.';
                  }

                  try {
                    v.parse(informationFormSchema.entries.icon, value);
                    return undefined;
                  } catch (error: any) {
                    if (error?.name === 'SyntaxError') {
                      return 'Invalid Data format.';
                    } else if (error instanceof v.ValiError) {
                      return `${error.message}.`;
                    } else if (error?.message) {
                      return error?.message;
                    } else {
                      return 'Unexpected error during parsing.';
                    }
                  }
                }
              }}
              children={(field: any) => {
                return (
                  <div className='flex flex-col gap-1'>
                    <div className='relative flex flex-col gap-2 xl:mt-[1.8rem]'>
                      <label className='text-xs text-ob-grey-lightest'>
                        Collection icon Image - (1000 x 1000px {'<'} 1 mb)
                      </label>
                      <div className='group mt-2 flex h-full min-h-72 cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-[#FFFFFF33]'>
                        <FileUpload
                          acceptFileType='image/*'
                          accept={['.jpg', 'jpeg', '.png']}
                          size='lg'
                          setData={field.handleChange}
                          preview={thumbnailPreview}
                          setPreview={setThumbnailPreview}
                        />
                      </div>
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name='banner_image'
              validators={{
                onChangeAsync: async ({ value }: { value: File }) => {
                  return await validateImage(1920, 1200, value, 'Banner', 1);
                }
              }}
              children={(field: any) => {
                return (
                  <div className='flex flex-col gap-1'>
                    <div className='flex flex-col gap-2 xl:mt-[1.8rem]'>
                      <label className='text-xs text-ob-grey-lightest'>
                        Collection banner Image - (1920 x 1200px {'<'} 1 mb)
                      </label>
                      <div className='group mt-2 flex h-full min-h-72 cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-[#FFFFFF33]'>
                        <FileUpload
                          acceptFileType='image/*'
                          accept={['.jpg', 'jpeg', '.png']}
                          size='lg'
                          setData={field.handleChange}
                          preview={bannerPreview}
                          setPreview={setBannerPreview}
                        />
                      </div>
                    </div>

                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>

      <div className='mt-16 flex justify-center gap-2'>
        <Button
          type='button'
          onClick={() => setStep(ESteps.START)}
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
              {isSubmitting ? <Loading size={32} /> : 'Next'}
            </Button>
          )}
        />
      </div>
    </form>
  );
};
