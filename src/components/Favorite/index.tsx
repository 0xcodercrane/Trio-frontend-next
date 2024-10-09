'use client';

import { Heart } from 'lucide-react';

interface FavoriteProps {
  action: () => void;
}

export default function Favorite({ action }: FavoriteProps) {
  return (
    <div
      className='flex h-[--button-height-sm] w-[--button-height-sm] items-center justify-center rounded-full bg-white'
      onClick={action}
    >
      <Heart color='black' size={15} />
    </div>
  );
}
