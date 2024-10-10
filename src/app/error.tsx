'use client'; // Error components must be Client Components

import { HeroLayout } from '@/components/Layouts';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <HeroLayout className='bg-ob-black'>
      <div className='flex h-screen items-center justify-center'>
        <div className='flex flex-col rounded p-8 shadow'>
          <h2 className='text-2xl font-bold'>Oops, Something went wrong!</h2>
          <pre className='my-4 text-white'>{error.message}</pre>
          <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600' onClick={() => reset()}>
            Try again
          </button>
        </div>
      </div>
    </HeroLayout>
  );
}
