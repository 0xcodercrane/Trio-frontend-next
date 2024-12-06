'use client';
import { useBlockHeight } from '@/lib/hooks/useBlockHeight';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

export function BlockCountdown({
  startBlock,
  endBlock,
  format
}: {
  startBlock: number;
  endBlock: number;
  format: 'block' | 'time';
}) {
  const [timeRemaining, setTimeRemaining] = useState<DateTime | null>(null);
  const [toTheSecondTime, setToTheSecondTime] = useState<DateTime | null>(null);
  const [blocksRemaining, setBlocksRemaining] = useState<number | null>(null);
  const { data: tip } = useBlockHeight();

  useEffect(() => {
    if (!tip) return;

    const interval = setInterval(() => {
      const now = DateTime.now();
      let remainingBlocks: number = -1;

      if (tip < startBlock) {
        remainingBlocks = startBlock - tip;
      } else if (tip < endBlock) {
        remainingBlocks = endBlock - tip;
      }

      const remainingTime = remainingBlocks * 10 * 60 * 1000; // 10 minutes per block in milliseconds
      const remaining = DateTime.now().plus({ milliseconds: remainingTime });
      setTimeRemaining(remaining);
      setBlocksRemaining(remainingBlocks);
    }, 1000);

    return () => clearInterval(interval);
  }, [tip, startBlock, endBlock]);

  useEffect(() => {
    if (!blocksRemaining || blocksRemaining === -1) return;
    const interval = setInterval(() => {
      setToTheSecondTime((prevTime) => (prevTime ? prevTime.minus({ seconds: 1 }) : timeRemaining));
    }, 1000);

    return () => clearInterval(interval);
  }, [blocksRemaining]);

  const content = useMemo(() => {
    if (!toTheSecondTime || !blocksRemaining || !tip) return '• • •';
    const toTheSecondDisplay = toTheSecondTime.toFormat(`d'd' h'h' m'm' s's`);

    if (startBlock === -1) {
      return 'Pending';
    } else if (tip < startBlock) {
      return `Coming in ${mapTimeToContent(format, toTheSecondDisplay, blocksRemaining)}`;
    } else if (endBlock === -1) {
      return 'Open Ended';
    } else if (tip < endBlock) {
      return mapTimeToContent(format, toTheSecondDisplay, blocksRemaining);
    } else if (tip >= endBlock) {
      return 'Ended';
    } else {
      return 'Unknown Schema';
    }
  }, [toTheSecondTime, blocksRemaining]);

  return <div className='rounded-md border border-ob-yellow px-2 py-1 text-ob-yellow'>{content}</div>;
}

const mapTimeToContent = (format: 'block' | 'time', timeRemaining: string | null, blocksRemaining: number | null) => {
  if (format === 'block') {
    return `${blocksRemaining} blocks`;
  } else if (format === 'time') {
    return `${timeRemaining}`;
  } else return '';
};
