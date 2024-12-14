import { LOW_POSTAGE, USE_LOW_POSTAGE } from '@/lib/constants';
import { useFeeRates } from '@/lib/hooks';
import { OrderType } from 'ordinalsbot/dist/types/v1';
import { useEffect, useMemo, useState } from 'react';
import ob from '../ob';
import { usePrices } from '@/lib/services';
import { TLegacyFees } from '@/types';
import { satsToBitcoin } from '@/lib/utilities';
import { TSpartacusOrder } from '../types';

//
// NOTE: The reason why this is a standalone component is because the Spartacus Project has their own API key that grants them a special rate on their inscriptions.
// The standard rate for Direct Inscriptions is 9000 satoshis per file, but we've granted them a rate of 2000 sats per file, only for their API KEY.
// So this component uses its own instance of the OB library seeded with the Spartacus API Key ENV Var.
//
//
// !IMPORTANT: This is the average size of spartacus files..
//  This is the average size of spartacus files.. The intention with using this Magic Number is to reduce overall complexity in the Spartacus implementation.
//  Fetching a file to be inscribed by the database constitutes a "lock" on the file, but we want to be able to show a price to the user before they
//   pay for the order. So rather than open up an attack vector by grabbing files upon page load (and price fetch), we take an average filesize
//   from the files, and use this to derive the price, and let the user know that the price listed on their screen is an average.
//
const AVERAGE_SPARTACUS_FILE_SIZE_BYTES = 1612;
const ORDINALSBOT_SERVICE_FEE = 2000; // Right now, the SDK doesn't include the API key in the getPrice call which
const OB_SIZE_FEE_FACTOR = 0.1;

export function SpartacusFeesPanel({ count, order }: { count: number; order: TSpartacusOrder | null }) {
  const { feeRate, isPending: feeRatePending } = useFeeRates();
  const { satsToUsd } = usePrices();
  const [fees, setFees] = useState<TLegacyFees | null>(null);
  const [feesLoading, setFeesLoading] = useState<boolean>(true);

  useEffect(() => {
    // return early if we don't have one of the required params
    if (feeRatePending) return;

    setFeesLoading(true);

    const fetchPrice = async () => {
      // Prices are really just fees
      const price = (await ob.Inscription().getPrice({
        type: OrderType.DIRECT,
        lowPostage: USE_LOW_POSTAGE,
        fee: feeRate,
        count,
        size: AVERAGE_SPARTACUS_FILE_SIZE_BYTES,
        rareSats: 'random'
      })) as unknown as TLegacyFees; //TODO:  The response type is most certainly not what the SDK thinks it is (December 9th, 2024)
      setFees(price);
      setFeesLoading(false);
    };

    fetchPrice();
  }, [feeRatePending, feeRate, count]);

  const feesToDisplay = useMemo(() => {
    const feeObj = {
      postage: LOW_POSTAGE * count,
      serviceFee: ORDINALSBOT_SERVICE_FEE * count
    };

    if (order) {
      return {
        ...feeObj,
        networkFee: order.networkFee,
        sizeFee: order.networkFee * OB_SIZE_FEE_FACTOR,
        total: order.amount
      };
    } else if (fees) {
      return {
        ...feeObj,
        networkFee: fees.chainFee,
        sizeFee: fees.chainFee * OB_SIZE_FEE_FACTOR,
        total: feeObj.postage + feeObj.serviceFee + fees.chainFee + fees.chainFee * OB_SIZE_FEE_FACTOR
      };
    } else
      return {
        ...feeObj,
        networkFee: 0,
        sizeFee: 0,
        total: feeObj.postage + feeObj.serviceFee
      };
  }, [order, fees]);

  const { postage, serviceFee, networkFee, sizeFee, total } = feesToDisplay;

  return (
    <div className='flex max-w-[80%] flex-col gap-2'>
      <div className='flex flex-col gap-2 bg-ob-purple-dark p-4'>
        <div className='grid w-full grid-cols-4'>
          <span className='col-span-2'>Inscription Sats</span>
          <span>
            {count} x {LOW_POSTAGE} sats
          </span>
          <span className='text-right'>{satsToUsd(postage).formatted}</span>
        </div>
        <div className='grid w-full grid-cols-4'>
          <span className='col-span-2'>Network Fee</span>
          <span>{fees?.chainFee} sats</span>
          <span className='text-right'>{satsToUsd(networkFee).formatted}</span>
        </div>
        <div className='grid w-full grid-cols-4'>
          <span className='col-span-2'>Size Fee</span>
          <span>{sizeFee.toFixed(0)} sats</span>
          <span className='text-right'>{satsToUsd(sizeFee).formatted}</span>
        </div>
        <hr className='opacity-50' />
        <div className='grid w-full grid-cols-4'>
          <span className='col-span-2'>Service Fee</span>
          <span>
            {count} x {ORDINALSBOT_SERVICE_FEE} sats
          </span>
          <span className='text-right'>{satsToUsd(serviceFee).formatted}</span>
        </div>
        <hr className='opacity-50' />
        <div className='grid w-full grid-cols-4 font-bold'>
          <span className='col-span-2'>Total cost to publish to Bitcoin</span>
          <span>{satsToBitcoin(total)} BTC</span>
          <span className='text-right'>{satsToUsd(total).formatted}</span>
        </div>
      </div>
      {!order && (
        <span className='text-sm italic text-ob-white-40'>
          Fee Disclaimer: Fees displayed are estimates and are subject to increase or decrease depending on the War Logs that
          you end up reserving after clicking &ldqup;Publish War Logs&rdqup;
        </span>
      )}
    </div>
  );
}
