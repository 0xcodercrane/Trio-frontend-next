import { GlobalContext } from '@/app/providers/GlobalContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useContext } from 'react';

export default function MenuCloseButton() {
  const { menuDisclosure } = useContext(GlobalContext);
  return (
    <Button variant='secondary' size='icon' onClick={menuDisclosure.close}>
      <X />
    </Button>
  );
}
