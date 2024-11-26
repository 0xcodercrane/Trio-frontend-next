'use client';

import { GlobalContext } from '@/app/providers/GlobalContext';
import { Button } from '@/components/ui/button';
import { EMenuType } from '@/types';
import { Bell } from 'lucide-react';
import { useContext } from 'react';

export default function NotificationButton() {
  const { menuDisclosure, setMenuType } = useContext(GlobalContext);
  return (
    <Button
      variant='icon'
      size='icon'
      onClick={() => {
        setMenuType(EMenuType.ACTIVITY);
        menuDisclosure.open();
      }}
    >
      <Bell />
    </Button>
  );
}
