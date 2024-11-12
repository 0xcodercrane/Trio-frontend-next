import { Input, InputProps } from '@/components/ui/input';
import { usePrices } from '@/lib/services';
import { formatUsdValue } from '@/lib/utilities';

interface CustomFeeInputProps extends InputProps {
  txVirtualSize: number | undefined;
  value?: number | undefined;
}

export default function CustomFeeInput({ txVirtualSize, value, ...props }: CustomFeeInputProps) {
  const { satsToUsd } = usePrices();
  const feeInUsd = txVirtualSize && value ? value * txVirtualSize : 0;
  return (
    <div className='flex w-full flex-row items-center justify-between rounded-sm bg-ob-black pr-2 ring-1 ring-ob-white-20'>
      <Input className='min-w-12 grow border-none bg-ob-black pl-2 text-ob-grey-lightest' type='number' {...props} />
      <span className='text-nowrap pl-1 text-sm text-ob-grey-lightest'>sats/vB | {satsToUsd(feeInUsd).formatted}</span>
    </div>
  );
}
