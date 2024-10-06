import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useFilter } from '@/lib/hooks/useFilter';

export default function NextPage() {
  const { nextPage, hasNext } = useFilter();
  return (
    <Button size='icon' onClick={nextPage} disabled={!hasNext()}>
      <ChevronRight />
    </Button>
  );
}
