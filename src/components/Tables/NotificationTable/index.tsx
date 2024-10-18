import { Loading } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useNotificationsQuery } from '@/lib/services/fetchNotifications';
import { TNotification } from '@/types';
import { DateTime } from 'luxon';

export default function NotificationTable() {
  const { data, isPending, error } = useNotificationsQuery();
  if (isPending) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className='flex min-h-[66vh] w-full flex-col justify-between gap-4'>
      <Table>
        <TableBody>
          {data?.map((notification: TNotification) => (
            <TableRow key={notification.id}>
              <TableCell className='flex flex-row gap-4 px-0 pl-2'>
                <span className='text-md capitalize'>{notification.payload.title}</span>
                <span className='text-ob-white-40'>
                  {DateTime.fromMillis(notification.timestamp.toMillis()).toRelative()}
                </span>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex flex-row items-center justify-center gap-4'>
        <span>Clear all notifications</span>
        <Button size='sm' variant='secondary' onClick={() => {}}>
          Clear
        </Button>
      </div>
    </div>
  );
}
