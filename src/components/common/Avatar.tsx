import { AuthContext } from '@/app/providers/AuthContext';
import { User } from 'lucide-react';
import Image from 'next/image';
import { useContext, useMemo } from 'react';
import { Loading } from '.';

interface AvatarProps {
  onClick?: () => void;
}

export default function Avatar({ onClick }: AvatarProps) {
  const { loading, user } = useContext(AuthContext);

  const src = useMemo(() => user?.profile?.avatar || null, [user]);

  if (loading) return <Loading />;
  if (!src) {
    return (
      <User
        className='h-auto max-h-[48px] w-full max-w-[48px] rounded-full bg-white p-[0.75rem] text-black'
        onClick={onClick}
      />
    );
  }

  return (
    <Image
      className='h-auto max-h-full w-auto rounded-full'
      src={src}
      alt='user avatar'
      width={50}
      height={50}
      onClick={onClick}
    />
  );
}
