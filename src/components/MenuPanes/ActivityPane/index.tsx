import { Container } from '@/components/Container';

export default function ActivityPane() {
  return (
    <Container>
      <div className='flex justify-end text-white'>
        <div className='w-2/3 rounded-lg bg-ob-black p-4'>
          <h2 className='text-2xl'>Activity Feed</h2>
          <span>Here are updates on trio.xyz</span>
        </div>
      </div>
    </Container>
  );
}
