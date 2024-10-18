'use client';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useRewardsQuery } from '@/lib/services/fetchUserRewards';
import { formatDate } from '@/lib/utilities';

export default function PointsHistoryTable() {
  const { data: rewards, isSuccess: rewardsSuccess } = useRewardsQuery();
  return (
    <Table>
      <TableBody>
        {rewardsSuccess &&
          rewards.length > 0 &&
          rewards.map((reward, index) => (
            <TableRow key={index} className='rounded-sm border-none text-xs text-white'>
              <TableCell className='py-3'>{formatDate(reward.date)}</TableCell>
              <TableCell className='py-3'>{reward.amount}</TableCell>
              <TableCell className='py-3 capitalize'>{reward.type}</TableCell>
              <TableCell className='py-3 font-mono'>{reward.id}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
