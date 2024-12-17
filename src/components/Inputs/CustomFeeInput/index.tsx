'use client';

import { Input, InputProps } from '@/components/ui/input';
import { usePrices } from '@/lib/services';
import { formatUsdValue } from '@/lib/utilities';
import { useState } from 'react';

interface CustomFeeInputProps extends InputProps {
  txVirtualSize: number | undefined;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomFeeInput({ txVirtualSize, value = '', onChange, ...props }: CustomFeeInputProps) {
  const { satsToUsd } = usePrices();
  const [localValue, setLocalValue] = useState<string>(value);

  // Keep track of local changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Update local state
    setLocalValue(newValue);

    // Pass value upward if onChange is defined
    if (onChange) {
      onChange(e);
    }
  };

  let feeInUsd: number = 0;
  if (localValue !== '') {
    feeInUsd = txVirtualSize && value ? Number(localValue) * txVirtualSize : 0;
  }
  return (
    <div className='flex w-full flex-row items-center justify-between rounded-sm bg-ob-purple-darkest pr-2 ring-1 ring-ob-white-20'>
      <Input
        className='min-w-12 grow border-none bg-ob-purple-darkest pl-2 text-ob-grey-lightest'
        type='number'
        value={localValue}
        onChange={handleChange}
        {...props}
      />
      <span className='text-nowrap pl-1 text-sm text-ob-grey-lightest'>sats/vB | {satsToUsd(feeInUsd).formatted}</span>
    </div>
  );
}
