import { AuthContext } from '@/app/providers/AuthContext';
import { Loading } from '@/components/common';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import numeral from 'numeral';
import { useContext } from 'react';

export default function HeaderPointsButton() {
  const { loading, user } = useContext(AuthContext);
  const { points } = user || 0;
  const router = useRouter();
  return (
    <Button
      className='flex flex-row justify-between gap-2 rounded-full font-extrabold'
      variant='secondary'
      onClick={() => router.push('/rewards')}
    >
      {loading && <Loading />}
      {(!loading && points && numeral(points).format('0.0a')) || 0} XP
    </Button>
  );
}
