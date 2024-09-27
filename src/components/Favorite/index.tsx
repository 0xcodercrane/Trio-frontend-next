'use client';

import { Heart } from 'lucide-react';

interface FavoriteProps {
  action: () => void;
}

export default function Favorite({ action }: FavoriteProps) {
  return (
    <div className='flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white' onClick={action}>
      <Heart color='black' size={15} />
    </div>
  );
}
