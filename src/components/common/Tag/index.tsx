'use client';

import { EComponentVariants } from '@/types';
import { Info } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface TagProps {
  variant?: EComponentVariants;
  label: string;
  className?: string;
  info?: string;
}

const SPIN_INTERVAL = 75;

const DIRECTIONS = ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'];
export default function Tag({ variant = EComponentVariants.Default, label, className, info }: TagProps) {
  const [tick, setTick] = useState(0);

  const { inner, outer } = useMemo(() => {
    const dir = DIRECTIONS[tick % DIRECTIONS.length];
    switch (variant) {
      case 'success':
        return {
          inner: 'bg-ob-black text-white',
          outer: `bg-gradient-to-${dir} from-ob-green-light to-ob-green`
        };
      case 'disabled':
        return {
          inner: 'bg-ob-black-lightest text-ob-white-40',
          outer: 'bg-ob-white-40'
        };
      case 'error':
        return {
          inner: 'bg-ob-black text-white',
          outer: `bg-gradient-to-${dir} from-ob-red-lightest via-ob-red-light to-ob-red-dark`
        };
      case 'info':
        return {
          inner: 'bg-ob-purple text-white',
          outer: `bg-gradient-to-${dir} from-ob-purple-light to-ob-purple-lighter`
        };
      default:
        return {
          inner: 'bg-ob-black text-white',
          outer: `bg-gradient-to-${dir} from-ob-blue to-ob-green`
        };
    }
  }, [variant, tick]);

  // Increment tick, which cases the background gradient to shift position once every SPIN_INTERVAL milliseconds
  useEffect(() => {
    const interval = setInterval(() => setTick((prevTick) => prevTick + 1), SPIN_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative h-[--button-height-sm] max-h-[--button-height-md] min-w-[96px] rounded-full p-[1px] shadow-lg ${className}`}
    >
      <div className={`absolute inset-0 h-full w-full rounded-full ${outer} duration-100 ease-in-out`}></div>
      <div
        className={`relative ml-[1px] flex h-full w-full flex-row items-center justify-between rounded-full px-4 ${inner} min-h-[calc(var(--button-height-sm)-2px)] max-w-[calc(100%-2px)] gap-2`}
      >
        <span className='text-nowrap text-center text-sm font-semibold'>{label}</span>
        {info && <Info size={12} />}
      </div>
    </div>
  );
}
