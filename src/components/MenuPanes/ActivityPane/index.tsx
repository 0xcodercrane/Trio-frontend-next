import { Chit, Divider } from '@/components/common';
import { Container } from '@/components/Container';
import { NotificationTable } from '@/components/Tables';
import { useNotificationsQuery } from '@/lib/services/fetchNotifications';
import { EComponentVariants } from '@/types';

export default function ActivityPane() {
  const { data } = useNotificationsQuery();

  return (
    <Container direction='col' justify='start'>
      <div className='mr-12 mt-12 flex justify-end text-white'>
        <div className='w-2/3 rounded-lg bg-ob-purple-darkest p-4'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <h2 className='text-2xl'>Activity Feed</h2>
              <span>Here are updates on trio.xyz</span>
            </div>
            <Chit variant={EComponentVariants.Success} label={`${data?.length}`} />
          </div>

          <Divider />

          <NotificationTable />
        </div>
      </div>
    </Container>
  );
}
