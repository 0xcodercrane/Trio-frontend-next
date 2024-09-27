import { Container } from '@/components/Container';
import { Tag } from '@/components/Tag';

const globalGap = 'gap-4';

export default function Page() {
  return (
    <div
      className={`flex h-[--top-section-height] w-full flex-col ${globalGap} h-screen bg-ob-black-light pt-[--header-height]`}
    >
      <Container padding>
        <div className={`flex flex-row ${globalGap}`}>
          <div className='flex flex-col'>
            <span className='mb-1 text-xs font-bold uppercase text-ob-grey-lighter'>default</span>
            <Tag label='1000' />
          </div>
          <div className='flex flex-col'>
            <span className='mb-1 text-xs font-bold uppercase text-ob-grey-lighter'>error</span>
            <Tag variant='error' label='1000' />
          </div>
          <div className='flex flex-col'>
            <span className='mb-1 text-xs font-bold uppercase text-ob-grey-lighter'>success</span>
            <Tag variant='success' label='1000' />
          </div>
          <div className='flex flex-col'>
            <span className='mb-1 text-xs font-bold uppercase text-ob-grey-lighter'>disabled</span>
            <Tag variant='disabled' label='1000' />
          </div>
        </div>
      </Container>
    </div>
  );
}
