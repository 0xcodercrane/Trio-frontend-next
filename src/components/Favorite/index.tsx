'use client';

import { Heart } from 'lucide-react';
import { Button } from '../ui/button';

interface FavoriteProps {
  action?: () => void;
}

export default function Favorite({ action }: FavoriteProps) {
  return (
    <Button onClick={action} size='icon' variant='secondary'>
      <Heart />
    </Button>
  );
}
