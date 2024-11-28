import { AuthContext } from '@/app/providers/AuthContext';
import { Loading } from '@/components/common';
import { Button } from '@/components/ui/button';
import numeral from 'numeral';
import { useContext } from 'react';

export default function HeaderPointsButton() {
  const { loading, user } = useContext(AuthContext);
  const { points } = user || 0;
  return (
    <Button className='flex flex-row justify-between gap-2 rounded-full font-extrabold' variant='secondary'>
      {loading && <Loading />}
      {(!loading && points && numeral(points).format('0a')) || 0} XP
    </Button>
  );
}
