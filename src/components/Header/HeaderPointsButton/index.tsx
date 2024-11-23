import { AuthContext } from '@/app/providers/AuthContext';
import { Loading } from '@/components/common';
import { Button } from '@/components/ui/button';
import numeral from 'numeral';
import { useContext } from 'react';

export default function HeaderPointsButton() {
  const { loading, user } = useContext(AuthContext);
  return (
    <Button className='flex flex-row justify-between gap-2 font-extrabold' variant='secondary'>
      {loading && <Loading />}
      {(!loading && numeral(user?.points).format('0.0a')) || 0} XP
    </Button>
  );
}
