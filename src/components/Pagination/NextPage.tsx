import { useFilter } from '@/lib/hooks/useFilter';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function NextPage({ disabled }: { disabled?: boolean }) {
  const { nextPage, hasNext } = useFilter();
  return (
    <Button variant='tab' size='icon' onClick={nextPage} disabled={!hasNext() || disabled}>
      <ChevronRight />
    </Button>
  );
}
