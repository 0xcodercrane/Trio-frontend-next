import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useFilter } from '@/lib/hooks/useFilter';

export default function PrevPage() {
  const { prevPage, hasPrev } = useFilter();
  return (
    <Button size='icon' onClick={prevPage} disabled={!hasPrev()}>
      <ChevronLeft />
    </Button>
  );
}
