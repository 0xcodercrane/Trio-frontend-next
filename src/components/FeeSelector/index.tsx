'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { usePrices } from '@/lib/services';
import { DEFAULT_FEE, DEFAULT_FEE_OPTIONS, feeOptionsConfig } from './constants';
import CustomFeeInput from '../Inputs/CustomFeeInput';
import { formatUsdValue } from '@/lib/utilities';
import { EFeeOptions } from '@/types';
import { useOrderFlow, useFeeRates } from '@/lib/hooks';

interface FeeSelectorProps {
  feeOptions?: Partial<{ [key in EFeeOptions]: boolean }>;
  txVirtualSize?: number;
}

export default function FeeSelector({ feeOptions = DEFAULT_FEE_OPTIONS, txVirtualSize }: FeeSelectorProps) {
  // Local state
  const [selectedFeeOption, setSelectedFeeOption] = useState<EFeeOptions>(DEFAULT_FEE);
  const [customFee, setCustomFee] = useState<number>();
  const { data: feeRatesData, isPending: isFeeRatesPending, setFeeRate } = useFeeRates();
  const { satsToUsd } = usePrices();

  useEffect(() => {
    if (feeRatesData && selectedFeeOption !== EFeeOptions.CUSTOM) {
      setFeeRate(feeRatesData[feeOptionsConfig[selectedFeeOption].dbKey]);
    }
  }, [feeRatesData]);

  useEffect(() => {
    if (feeRatesData && !customFee) {
      setCustomFee(feeRatesData.fastest_fee);
    }
  }, [feeRatesData, customFee]);

  useEffect(() => {
    if (selectedFeeOption === EFeeOptions.CUSTOM) {
      if (!!customFee) {
        setFeeRate(customFee);
      }
    } else if (feeRatesData) {
      setFeeRate(feeRatesData[feeOptionsConfig[selectedFeeOption].dbKey]);
    }
  }, [selectedFeeOption, customFee]);

  const feeOptionsToRender = useMemo(
    () => [...Object.values(EFeeOptions).filter((feeType) => !!feeOptions[feeType]), EFeeOptions.CUSTOM],
    [feeOptions]
  );

  const handleFeeRateSelection = (feeOption: EFeeOptions) => {
    setSelectedFeeOption(feeOption);
    if (feeOption === EFeeOptions.CUSTOM) {
      if (customFee) {
        setFeeRate(customFee);
      }
    } else if (feeRatesData) {
      setFeeRate(feeRatesData[feeOptionsConfig[feeOption].dbKey]);
    }
  };

  const handleCustomFeeRateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setCustomFee(parseFloat(event.target.value));
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-ob-grey-lightest'>Network Fee / Speed</span>
      <div className='flex w-full flex-row gap-2'>
        {feeOptionsToRender.map((feeOption) => {
          const currentFeeRate = feeOption !== EFeeOptions.CUSTOM && feeRatesData?.[feeOptionsConfig[feeOption].dbKey];
          const txFee = currentFeeRate && txVirtualSize ? currentFeeRate * txVirtualSize : 0;
          return (
            <div key={feeOption} className='min-h-[96px] basis-1/3'>
              {isFeeRatesPending || !feeRatesData ? (
                <Skeleton className='h-full w-full' />
              ) : (
                <div
                  className={`h-full cursor-pointer rounded-md border border-ob-purple-lighter ${selectedFeeOption === feeOption ? 'bg-ob-purple' : 'bg-ob-purple-dark'}`}
                >
                  <input
                    type='radio'
                    id={feeOption}
                    className='hidden min-h-full min-w-full'
                    value={feeOption}
                    checked={selectedFeeOption === feeOption}
                    onChange={() => handleFeeRateSelection(feeOption)}
                  />

                  <label htmlFor={feeOption} className='cursor-pointer'>
                    <div className='flex h-full flex-col justify-between p-4'>
                      <div className='text-lg text-white'>{feeOptionsConfig[feeOption].label}</div>
                      {feeOption === EFeeOptions.CUSTOM ? (
                        <div>
                          <CustomFeeInput
                            txVirtualSize={txVirtualSize}
                            type='number'
                            value={customFee}
                            onChange={handleCustomFeeRateChange}
                          />
                        </div>
                      ) : (
                        <div className='text-sm text-ob-grey-lightest'>
                          {currentFeeRate} sats/vB ~{satsToUsd(txFee).formatted}
                        </div>
                      )}{' '}
                    </div>
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export * from './constants';
