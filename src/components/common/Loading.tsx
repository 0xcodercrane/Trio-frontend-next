import { LoaderCircle } from 'lucide-react';

export default function Loading({ className }: { className?: string }) {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <LoaderCircle size={48} className={`${className} animate-spin text-ob-green-light/[0.80]`} />
    </div>
  );
}
