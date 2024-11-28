'use client';
import { AuthContext } from '@/app/providers/AuthContext';
import { User } from 'lucide-react';
import Image from 'next/image';
import { useContext, useMemo } from 'react';
import { Loading } from '.';
import { Button } from '../ui/button';

interface AvatarProps {
  onClick?: () => void;
  size?: 'default' | 'xs';
}

export default function Avatar({ onClick, size = 'default' }: AvatarProps) {
  const { loading, user } = useContext(AuthContext);

  const src = useMemo(() => user?.profile?.avatar || null, [user]);

  if (loading)
    return (
      <div className='h-auto max-h-[--button-height-md] w-full max-w-[--button-height-md] rounded-full bg-white p-[0.75rem] text-black'>
        <Loading />
      </div>
    );

  if (!src) {
    return (
      <Button variant='icon' onClick={onClick} size={size === 'default' ? 'icon' : 'icon-xs'}>
        <User />
      </Button>
    );
  }

  return (
    <Image
      className='h-auto max-h-[--header-content-height] w-auto rounded-full'
      src={src}
      alt='user avatar'
      width={50}
      height={50}
      onClick={onClick}
    />
  );
}
