import { Loading } from '@/components/common';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFilter } from '@/lib/hooks';
import { useRewards } from '@/lib/services';
import { formatDate } from '@/lib/utilities';
import { ERewardType } from '@/types';
import { useMemo } from 'react';

export default function XPMiningRewardsTable() {
  const { offset, limit } = useFilter();
  const { rewards, loading } = useRewards(ERewardType.Stake, { offset, limit });
  const rewardsToDisplay = useMemo(() => rewards.slice(offset, limit), [offset, limit, rewards]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <Loading />}
        {!loading &&
          rewardsToDisplay.map(({ date, amount, id }) => (
            <TableRow key={id} className='rounded-sm border-none text-center text-xs text-white'>
              <TableCell className='py-3'>{formatDate(date)}</TableCell>
              <TableCell className='py-3'>{amount}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
