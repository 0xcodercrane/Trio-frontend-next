'use client';
import { Chit, Loading } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MEMPOOL_SPACE_URL } from '@/lib/constants';
import { formatDate, shortenTxid } from '@/lib/utilities';
import { EComponentVariants, EOrderSubType, ERewardState } from '@/types';
import { ETrioOrderType, TTrioAccountOrder } from '@/types/orders';
import Link from 'next/link';
import { InscriptionOrderState, OrderType } from 'ordinalsbot/dist/types/v1';
import { useMemo, useState } from 'react';

enum EFilter {
  All = 'All',
  Trio = 'trio.xyz',
  OrdinalsBot = 'ordinalsbot.com'
}

const FilterValues = Object.values(EFilter);

export default function TrioAccountOrdersTable({ orders, loading }: { orders: TTrioAccountOrder[]; loading: boolean }) {
  const [filter, setFilter] = useState<EFilter>(EFilter.Trio);

  const ordersToDisplay = useMemo(() => {
    if (loading) return [];
    if (filter === EFilter.All) return orders;
    return orders.filter((o) => o.source === filter);
  }, [filter, orders]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row flex-wrap items-center justify-between gap-2 py-8 md:flex-nowrap'>
        <h3>Account Order History</h3>
        <div>
          {FilterValues.map((f, index) => (
            <Button
              size='sm'
              key={index}
              variant='tab'
              onClick={() => setFilter(f)}
              className={`${filter === f ? 'active' : ''}`}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Order State</TableHead>
          <TableHead>Rewarded</TableHead>
          <TableHead>Txid</TableHead>
        </TableHeader>
        <TableBody>
          {loading && <Loading />}
          {ordersToDisplay.map(({ createdAt, type, subType, source, state, rewardState, txid }, index) => (
            <TableRow key={index} className='rounded-sm border-none text-center text-xs text-white'>
              <TableCell>{formatDate(createdAt)}</TableCell>
              <TableCell>{mapTypesToText(type, subType)}</TableCell>
              <TableCell>{source}</TableCell>
              <TableCell>{state ? <span className={mapOrderStateToColor(state)}>{state}</span> : '--'}</TableCell>
              <TableCell>
                <div className='flex items-center justify-center'>
                  <Chit variant={mapRewardStateToVariant(rewardState)} label={rewardState} />
                </div>
              </TableCell>
              <TableCell>
                {txid ? (
                  <Link href={`${MEMPOOL_SPACE_URL}/tx/${txid}`} className='hover:text-ob-green-light' target='_blank'>
                    {shortenTxid(txid)}
                  </Link>
                ) : (
                  'txid not found'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const mapOrderStateToColor = (state: InscriptionOrderState): string => {
  switch (state) {
    case InscriptionOrderState.WAITING_CONFIRMATION:
    case InscriptionOrderState.WAITING_PARENT:
    case InscriptionOrderState.WAITING_REFUND:
    case InscriptionOrderState.WAITING_PAYMENT:
      return 'text-ob-yellow';
    case InscriptionOrderState.CANCELED:
    case InscriptionOrderState.ERROR:
    case InscriptionOrderState.EXPIRED:
      return 'text-ob-red';
    case InscriptionOrderState.PREP:
      return 'text-ob-blue';
    case InscriptionOrderState.COMPLETED:
    case InscriptionOrderState.QUEUED:
    case InscriptionOrderState.REFUNDED:
    default:
      return 'text-ob-green-light';
  }
};

const mapRewardStateToVariant = (state: ERewardState): EComponentVariants => {
  switch (state) {
    case ERewardState.Granted:
      return EComponentVariants.Success;
    case ERewardState.Ineligable:
      return EComponentVariants.Error;
    case ERewardState.Default:
    default:
      return EComponentVariants.Primary;
  }
};

const mapTypesToText = (type: OrderType | ETrioOrderType, subType: EOrderSubType): string => {
  switch (type) {
    case OrderType.DIRECT:
      return 'Inscription';
    case OrderType.BRC20:
      return formatSubType(subType);
    case OrderType.RUNE_ETCH:
      return 'Rune Etch';
    case OrderType.RUNE_LAUNCHPAD_MINT:
      return 'Rune Launchpad Mint';
    case OrderType.RUNE_MINT: {
      return 'Rune Mint';
    }
    case OrderType.BULK: {
      return formatSubType(subType);
    }
    case ETrioOrderType.BuyListing: {
      return 'Buy Inscription';
    }
    case ETrioOrderType.PreinscribeMint: {
      return 'Mint';
    }
    default: {
      if (subType) return formatSubType(subType);
      return 'Unknown Order Type';
    }
  }
};

const formatSubType = (subType: string): string =>
  (subType &&
    subType
      .split('-') // Split the string into an array by the '-' character
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ')) ||
  'Unknown Order Type';
