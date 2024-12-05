import { LoaderCircle } from 'lucide-react';

export default function Loading({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <LoaderCircle size={size} className={`${className} animate-spin text-ob-green-light/[0.80]`} />
    </div>
  );
}
