'use client';

import { useEffect, useMemo, useState } from 'react';

interface TagProps {
  variant?: 'default' | 'error' | 'disabled' | 'success';
  label: string;
}

const SPIN_INTERVAL = 75;

const DIRECTIONS = ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'];
export const Tag = ({ variant = 'default', label }: TagProps) => {
  const [tick, setTick] = useState(0);

  const { inner, outer } = useMemo(() => {
    const dir = DIRECTIONS[tick % DIRECTIONS.length];
    switch (variant) {
      case 'success':
        return {
          inner: 'bg-ob-black text-white',
          outer: `bg-gradient-to-${DIRECTIONS[tick % DIRECTIONS.length]} from-ob-green-light to-ob-green`
        };
      case 'disabled':
        return {
          inner: 'bg-ob-black-lightest text-ob-white-40',
          outer: 'bg-ob-white-40'
        };
      case 'error':
        return {
          inner: 'bg-ob-black text-white',
          outer: `bg-gradient-to-${DIRECTIONS[tick % DIRECTIONS.length]} from-ob-red-lightest via-ob-red-light to-ob-red-dark`
        };
      default:
        return {
          inner: 'bg-ob-black text-white',
          outer: `bg-gradient-to-${DIRECTIONS[tick % DIRECTIONS.length]} from-ob-blue to-ob-green`
        };
    }
  }, [variant, tick]);

  // Increment tick, which cases the background gradient to shift position once every SPIN_INTERVAL milliseconds
  useEffect(() => {
    const interval = setInterval(() => setTick((prevTick) => prevTick + 1), SPIN_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative max-h-[24px] min-w-[96px] rounded-sm p-[1px] shadow-lg'>
      <div className={`absolute inset-0 h-full w-full rounded-sm ${outer} duration-100 ease-in-out`}></div>
      <span
        className={`relative flex h-full w-full items-center justify-center rounded-sm px-4 text-center font-bold ${inner} `}
      >
        {label}
      </span>
    </div>
  );
};
