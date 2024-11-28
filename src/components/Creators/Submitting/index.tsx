export const Submitting = () => {
  return (
    <div className='flex w-full items-center justify-center rounded-md bg-ob-purple-dark p-8 text-white'>
      <div className='flex flex-col gap-2'>
        <div className='animate-pulse text-center text-4xl font-bold'>Submitting Collection...</div>
        <span className='text-center text-sm text-ob-grey-lightest'>This may take some time</span>
      </div>
    </div>
  );
};
