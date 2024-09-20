import Link from 'next/link';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center text-white'>
      <TriangleAlert size='64' color='red' />
      <div className='flex flex-col gap-4 text-center'>
        <h2 className='text-4xl font-bold'>Not Found</h2>
        <p className='text-xl'>Could not find requested resource</p>
        <Link className='hover:text-ob-blue' href='/'>
          <Button variant='secondary'>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
