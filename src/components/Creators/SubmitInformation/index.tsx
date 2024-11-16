import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState } from 'react';
import { ESteps } from '../Launchpad';
import FieldInfo from '@/components/common/FieldInfo';
import validate from 'bitcoin-address-validation';
import * as v from 'valibot';

export const informationSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(3, 'Collection name must be at least 3 characters.')),
  description: v.pipe(v.string(), v.trim(), v.minLength(20, 'Collection description must be at least 20 characters.')),
  website: v.pipe(v.string(), v.trim(), v.url('Please enter a valid URL for the website.')),
  xHandle: v.pipe(
    v.string(),
    v.trim(),
    v.startsWith('https://x.com', 'Please enter a valid X handle (e.g., https://x.com/username).')
  ),
  discordHandle: v.optional(v.pipe(v.string(), v.trim()), ''),
  telegramHandle: v.optional(v.pipe(v.string(), v.trim()), ''),
  instagramHandle: v.optional(v.pipe(v.string(), v.trim()), ''),
  creatorName: v.pipe(v.string(), v.trim(), v.minLength(3, 'Creator name is required and must be at least 3 characters.')),
  creatorEmail: v.pipe(v.string(), v.email('Please enter a valid email address.')),
  creatorBTCAddress: v.pipe(v.string(), v.trim(), v.nonEmpty('Creator BTC address can not be empty')),
  thumbnail: v.pipe(
    v.file('A thumbnail image file is required.'),
    v.mimeType(['image/jpeg', 'image/png'], 'Thumbnail must be a JPEG or PNG file.'),
    v.maxSize(1024 * 1024, 'Thumbnail must be smaller than 1 MB.')
  ),
  banner: v.pipe(
    v.file('A banner image file is required.'),
    v.mimeType(['image/jpeg', 'image/png'], 'Banner must be a JPEG or PNG file.'),
    v.maxSize(1024 * 1024, 'Banner must be smaller than 1 MB.')
  )
});

export type TInformationSchema = v.InferInput<typeof informationSchema>;

export const SubmitInformation = ({
  form,
  bannerPreview,
  thumbnailPreview,
  setStep,
  setBannerPreview,
  setThumbnailPreview
}: {
  form: any;
  bannerPreview: string | null;
  thumbnailPreview: string | null;
  setStep: (step: number) => void;
  setBannerPreview: (preview: string | null) => void;
  setThumbnailPreview: (preview: string | null) => void;
}) => {
  const [imageHandler, setImageHandler] = useState<any>(null);
  const imgRef = useRef<any>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && imageHandler) {
      imageHandler.handleChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageHandler.field === 'thumbnail') {
          setThumbnailPreview(reader.result as string);
        } else {
          setBannerPreview(reader.result as string);
        }
        setImageHandler(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageValidator = async (witdth: number, height: number, value: File, title: string, size: number) => {
    const maxFileSize = size * 1024 * 1024;

    if (!value.size) {
      return `${title} can not be empty.`;
    }

    if (value.size > maxFileSize) {
      return `${title} must be smaller than ${size} MB.`;
    }

    const isValidRatio = await new Promise<boolean>((resolve) => {
      const img = document.createElement('img');
      img.onload = () => {
        const imageWidth = img.width;
        const imageHeight = img.height;

        const isCloseEnough = Math.abs(imageWidth - witdth) <= 200 && Math.abs(imageHeight - height) <= 200;
        resolve(isCloseEnough);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(value);
    });

    if (!isValidRatio) {
      return `Invalid image ratio. Please upload an image with a ${witdth}x${height} resolution or close to it.`;
    }

    return undefined;
  };

  const handleGoToNextStep = () => {
    try {
      v.parse(informationSchema, form.state.values);
      form.handleSubmit();
      setStep(ESteps.INFORMATION + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-full rounded-md bg-ob-black-light px-8 py-12 text-white'>
        <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8'>
          <div className='flex w-full flex-col gap-4'>
            <form.Field
              name='name'
              validators={{
                onChange: informationSchema.entries.name
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm' htmlFor={name}>
                      Collection Name
                    </label>
                    <Input
                      id={name}
                      value={state.value || ''}
                      type='text'
                      placeholder='XXX'
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
              name='description'
              validators={{
                onChange: informationSchema.entries.description
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;
                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm' htmlFor={name}>
                      Collection Description
                    </label>
                    <Textarea
                      id={name}
                      value={state.value || ''}
                      placeholder='XXX'
                      className='w-full border-none bg-ob-grey-light px-5 py-5 outline-none'
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
              name='website'
              validators={{
                onChange: informationSchema.entries.website
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm' htmlFor={name}>
                      Website
                    </label>
                    <Input
                      id={name}
                      value={state.value || ''}
                      type='text'
                      placeholder='XXX'
                      className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
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
                name='xHandle'
                validators={{
                  onChange: informationSchema.entries.xHandle
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;

                  return (
                    <div className='flex w-full flex-col gap-1'>
                      <label className='text-sm' htmlFor={name}>
                        X Handle
                      </label>
                      <div className='flex items-center rounded-md bg-ob-grey-light'>
                        <Input
                          id={name}
                          value={state.value || ''}
                          type='text'
                          placeholder='XXX'
                          className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
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
                name='discordHandle'
                validators={{
                  onChange: informationSchema.entries.discordHandle
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;

                  return (
                    <div className='flex w-full flex-col gap-1'>
                      <label className='text-sm' htmlFor={name}>
                        Discord Handle
                      </label>
                      <div className='flex items-center rounded-md bg-ob-grey-light'>
                        <Input
                          id={name}
                          value={state.value || ''}
                          type='text'
                          placeholder='XXX'
                          className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
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
                name='telegramHandle'
                validators={{
                  onChange: informationSchema.entries.telegramHandle
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;

                  return (
                    <div className='flex w-full flex-col gap-1'>
                      <label className='text-sm' htmlFor={name}>
                        Telegram Handle
                      </label>
                      <div className='flex items-center rounded-md bg-ob-grey-light'>
                        <Input
                          id={name}
                          value={state.value || ''}
                          type='text'
                          placeholder='XXX'
                          className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
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
                name='instagramHandle'
                validators={{
                  onChange: informationSchema.entries.instagramHandle
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;

                  return (
                    <div className='flex w-full flex-col gap-1'>
                      <label className='text-sm' htmlFor={name}>
                        Instagram Handle
                      </label>
                      <div className='flex items-center rounded-md bg-ob-grey-light'>
                        <Input
                          id={name}
                          value={state.value || ''}
                          type='text'
                          placeholder='XXX'
                          className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
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

          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-2'>
              <form.Field
                name='creatorName'
                validators={{
                  onChange: informationSchema.entries.creatorName
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;

                  return (
                    <div className='flex w-full flex-col gap-1'>
                      <label className='text-sm' htmlFor={name}>
                        Creator Handle
                      </label>
                      <Input
                        id={name}
                        value={state.value || ''}
                        type='text'
                        placeholder='XXX'
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
                name='creatorEmail'
                validators={{
                  onChange: informationSchema.entries.creatorEmail
                }}
                children={(field: any) => {
                  const { state, name, handleBlur, handleChange } = field;

                  return (
                    <div className='flex w-full flex-col gap-1'>
                      <label className='text-sm' htmlFor={name}>
                        Creator Email
                      </label>
                      <Input
                        id={name}
                        value={state.value || ''}
                        type='text'
                        placeholder='XXX'
                        className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
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
              name='creatorBTCAddress'
              validators={{
                onChangeAsync: async ({ value }: { value: string }) => {
                  const isValidAddress = validate(value);
                  return isValidAddress ? undefined : 'Invalid BTC address';
                }
              }}
              children={(field: any) => {
                const { state, name, handleBlur, handleChange } = field;

                return (
                  <div className='flex w-full flex-col gap-1'>
                    <label className='text-sm' htmlFor={name}>
                      Creator BTC Address
                    </label>
                    <Input
                      id={name}
                      value={state.value || ''}
                      type='text'
                      placeholder='XXX'
                      className='w-full border-none bg-ob-grey-light px-5 py-7 outline-none'
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
                name='thumbnail'
                validators={{
                  onChangeAsync: async ({ value }: { value: File }) => {
                    return await imageValidator(1000, 1000, value, 'Thumbnail', 1);
                  }
                }}
                children={(field: any) => {
                  return (
                    <div className='flex flex-col gap-1'>
                      <div
                        onClick={() => {
                          setImageHandler({ handleChange: field.handleChange, field: field.name });
                          imgRef?.current?.click();
                        }}
                        className='relative flex flex-col gap-2 xl:mt-[1.8rem]'
                      >
                        <label className='text-xs'>Collection thumbnail Image - (1000 x 1000 {'<'} 1mb)</label>
                        <div className='group mt-2 flex h-full min-h-72 cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-[#FFFFFF33]'>
                          {thumbnailPreview ? (
                            <Image
                              src={thumbnailPreview}
                              alt='thumbnail Preview'
                              width={300}
                              height={100}
                              className='rounded-m h-full w-full rounded-lg object-cover transition duration-200 hover:scale-105'
                            />
                          ) : (
                            <Image
                              alt='upload'
                              src='/img/creators/upload.svg'
                              className='opacity-70 transition duration-100 hover:opacity-100'
                              width={131}
                              height={131}
                            />
                          )}
                        </div>
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />

              <form.Field
                name='banner'
                validators={{
                  onChangeAsync: async ({ value }: { value: File }) => {
                    return await imageValidator(1920, 1200, value, 'Banner', 1);
                  }
                }}
                children={(field: any) => {
                  return (
                    <div className='flex flex-col gap-1'>
                      <div
                        onClick={() => {
                          setImageHandler({ handleChange: field.handleChange, field: field.name });
                          imgRef?.current?.click();
                        }}
                        className='flex flex-col gap-2 xl:mt-[1.8rem]'
                      >
                        <label className='text-xs'>Collection Banner Image - (1920 x 1200px {'<'} 1mb)</label>
                        <div className='group mt-2 flex h-full min-h-72 cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-[#FFFFFF33]'>
                          {bannerPreview ? (
                            <Image
                              src={bannerPreview}
                              alt='Banner Preview'
                              width={300}
                              height={100}
                              className='rounded-m h-full w-full rounded-lg object-cover transition duration-200 hover:scale-105'
                            />
                          ) : (
                            <Image
                              alt='upload'
                              src='/img/creators/upload.svg'
                              className='opacity-70 transition duration-100 hover:opacity-100'
                              width={131}
                              height={131}
                            />
                          )}
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
          <Button type='button' onClick={() => setStep(ESteps.INFORMATION - 1)} variant='secondary' size='lg'>
            Previous
          </Button>
          <Button type='button' onClick={() => handleGoToNextStep()} variant='secondary' size='lg'>
            Next
          </Button>
        </div>
      </div>

      <input
        ref={imgRef}
        type='file'
        accept='image/jpeg, image/png'
        className='hidden'
        onChange={(e) => handleImageChange(e)}
      />
    </>
  );
};
