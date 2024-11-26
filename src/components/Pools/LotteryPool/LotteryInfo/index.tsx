'use client';

import { DataItem } from '@/components/common';
import numeral from 'numeral';
import { useMemo } from 'react';

export const LotteryInfo = ({
  totalEstimatedValue,
  totalUserTickets,
  totalNumberOfTicketsSold
}: {
  totalEstimatedValue: number;
  totalUserTickets: number;
  totalNumberOfTicketsSold: number;
}) => {
  const winPercent = useMemo(() => {
    if (!totalNumberOfTicketsSold) return 0;
    return ((totalUserTickets / totalNumberOfTicketsSold) * 100).toFixed(2);
  }, [totalUserTickets, totalNumberOfTicketsSold]);

  return (
    <div className='grid grid-cols-3'>
      <DataItem label='est. value' value={`$${numeral(totalEstimatedValue).format('0,0')}`} />
      <DataItem label='win %' value={winPercent.toString()} />
      <DataItem label='your # of tickets' value={totalUserTickets.toString()} />
    </div>
  );
};
