import { AuthContext } from '@/app/providers/AuthContext';
import { Button } from '@/components/ui/button';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useContext } from 'react';

export default function ActivityPane() {
  const { logout } = useContext(AuthContext);
  const { disconnect } = useLaserEyes();

  return (
    <div>
      <h1>Activity</h1>
      <Button
        variant='destructive'
        onClick={() => {
          logout();
          disconnect();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
