'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { MediaWrapper } from '../common';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const InscriptionCard = ({
  inscription,
  handleMultiSelect,
  handleSellInscription
}: {
  inscription: any;
  handleMultiSelect: any;
  handleSellInscription: any;
}) => {
  const { id } = inscription.thumbnail_inscriptions[0];
  const [price, setPrice] = useState<number | string>('');
  const [hasError, setHasError] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const sellIndividualInscription = async () => {
    if (!price || Number(price) <= 0) {
      setHasError(true);
      return;
    }
    setHasError(false);
    const utxos = [
      {
        inscription_id: id,
        price
      }
    ];
    const response = await handleSellInscription(utxos);
    if (response) {
      setIsChecked(false);
      setPrice('');
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPrice(inputValue);

    // Validate price and clear error if valid
    if (inputValue && Number(inputValue) > 0) {
      setHasError(false);
      if (isChecked) handleMultiSelect(true, inputValue, id);
    } else {
      setHasError(true);
      if (isChecked) {
        handleMultiSelect(false, inputValue, id);
        setIsChecked(false);
      }
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && Number(price) === 0) {
      setHasError(true);
      toast.error('Please insert price before selection');
      setIsChecked(false);
      return;
    }
    setIsChecked(e.target.checked);
    setHasError(false);
    handleMultiSelect(e.target.checked, price, id);
  };

  return (
    <div key={id} className='relative h-full w-full max-w-[256px] rounded-xl bg-[#252525]'>
      <div className='flex h-[256px] w-full max-w-[256px] flex-col items-center gap-4 p-4 pb-4'>
        <MediaWrapper key={id} id={id} square className='relative h-[--inscription-smaller] overflow-hidden rounded-xl' />
        <div className='flex flex-row items-center gap-2'>
          <div>
            <Input
              placeholder='Price'
              className={`grow border-none bg-ob-black pl-2 text-ob-grey-lightest`}
              type='number'
              value={price}
              onChange={handlePriceChange} // Update price state
            />
            {hasError && <span>Please enter price</span>}
          </div>
          <Button variant='secondary' onClick={() => sellIndividualInscription()}>
            {' '}
            Sell{' '}
          </Button>
        </div>
      </div>
      <div className='absolute right-3 top-3 hover:cursor-pointer hover:opacity-80'>
        <Input
          placeholder='multiple-select'
          className={`grow border-none bg-ob-black pl-2 text-ob-grey-lightest`}
          type='checkbox'
          checked={isChecked}
          onChange={handleSelectChange}
        />
      </div>
    </div>
  );
};

export { InscriptionCard };
