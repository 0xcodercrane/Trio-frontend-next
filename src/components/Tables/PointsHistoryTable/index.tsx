'use client';
import { Loading } from '@/components/common';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useRewards } from '@/lib/services/fetchUserRewards';
import { formatDate } from '@/lib/utilities';

export default function PointsHistoryTable() {
  const { rewards, loading } = useRewards();
  return (
    <Table>
      <TableBody>
        {loading && <Loading />}
        {!loading &&
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
