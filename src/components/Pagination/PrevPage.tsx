import { useFilter } from '@/lib/hooks/useFilter';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';

export default function PrevPage({ disabled }: { disabled?: boolean }) {
  const { prevPage, hasPrev } = useFilter();
  return (
    <Button variant='tab' size='icon' onClick={prevPage} disabled={!hasPrev() || disabled}>
      <ChevronLeft />
    </Button>
  );
}
