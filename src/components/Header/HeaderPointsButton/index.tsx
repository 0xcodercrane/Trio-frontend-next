import { AuthContext } from '@/app/providers/AuthContext';
import { GlobalContext } from '@/app/providers/GlobalContext';
import { Loading } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useContext } from 'react';

export default function HeaderPointsButton() {
  const { loading, user } = useContext(AuthContext);
  return (
    <Button className='flex flex-row justify-between gap-2 font-extrabold' variant='secondary'>
      {loading && <Loading />}
      {(!loading && user?.points) || 0}
      <Star />
    </Button>
  );
}
