'use client';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { DEFAULT_INITIAL_PAGINATION, usePagination } from '@/lib/hooks';
import { useRewardsQuery } from '@/lib/services/fetchUserRewards';
import { formatDate } from '@/lib/utilities';

export default function PointsHistoryTable() {
  const pagination = usePagination(DEFAULT_INITIAL_PAGINATION);
  const { data: rewards, isSuccess: rewardsSuccess } = useRewardsQuery(pagination);
  return (
    <Table>
      <TableBody>
        {rewardsSuccess &&
          rewards.length > 0 &&
          rewards.map(({ date, amount, type, id }, index) => (
            <TableRow key={index} className='rounded-sm border-none text-xs text-white'>
              <TableCell className='py-3'>{formatDate(date)}</TableCell>
              <TableCell className='py-3'>{amount}</TableCell>
              <TableCell className='py-3 capitalize'>{type}</TableCell>
              <TableCell className='py-3 font-mono'>{id}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
