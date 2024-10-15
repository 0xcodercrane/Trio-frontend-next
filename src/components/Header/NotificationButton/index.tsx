'use client';

import { GlobalContext } from '@/app/providers/GlobalContext';
import { Button } from '@/components/ui/button';
import { EMenuType } from '@/types';
import { Bell } from 'lucide-react';
import { useContext } from 'react';

// TODO - Hook this up to the notification system
export default function NotificationButton() {
  const { menuDisclosure, setMenuType } = useContext(GlobalContext);
  return (
    <Button
      variant='secondary'
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
