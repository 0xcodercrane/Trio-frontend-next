import { Button } from '@/components/ui/button';

export default function PendingOrderButton() {
  return (
    <Button className='rounded-full border-2 border-solid border-ob-red font-extrabold ring-offset-4' variant='secondary'>
      Pending (2)
    </Button>
  );
}
