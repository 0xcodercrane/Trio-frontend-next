'use client';

import { useEffect, useState } from 'react';

export default function TimeLeft({ targetTime }: { targetTime: number }) {
  const [timeLeft, setTimeLeft] = useState(targetTime - Math.floor(Date.now() / 1000));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='flex gap-1 text-xs text-white'>
      <div className='flex min-w-11 items-center justify-center bg-ob-purple-lighter px-1 py-0.5'>
        {formatTime(hours)} <span className='ml-1'>hr</span>
      </div>
      <div className='flex w-11 items-center justify-center bg-ob-purple-lighter px-1 py-0.5'>
        {formatTime(minutes)} <span className='ml-1'>min</span>
      </div>
      <div className='flex w-11 items-center justify-center bg-ob-purple-lighter px-1 py-0.5'>
        {formatTime(seconds)} <span className='ml-1'>sec</span>
      </div>
    </div>
  );
}
