import { cn } from '@/lib/utils';

export default function Divider({ className }: { className?: string }) {
  return <hr className={cn('my-2 border-ob-grey-lighter', className)} />;
}
