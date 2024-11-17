import Section from '@/components/Section';
import {
  MEMPOOL_URL,
  MEMPOOL_API_URL,
  ORDINALSBOT_MARKETPLACE_API_URL,
  PUBLIC_API_URL,
  SUPABASE_URL,
  SUPABASE_ANON_KEY
} from '@/lib/constants';
export default function Page() {
  return (
    <Section className='bg-ob-black'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <span className='text-sm uppercase text-ob-yellow'>MEMPOOL URL</span>
          <span>{MEMPOOL_URL}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm uppercase text-ob-yellow'>MEMPOOL API URL</span>
          <span>{MEMPOOL_API_URL}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm uppercase text-ob-yellow'>PUBLIC API URL</span>
          <span>{PUBLIC_API_URL}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm uppercase text-ob-yellow'>SUPABASE URL</span>
          <span>{SUPABASE_URL}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm uppercase text-ob-yellow'>SUPABSE ANON KEY</span>
          <span>{SUPABASE_ANON_KEY}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm uppercase text-ob-yellow'>ORDINALSBOT_MARKETPLACE_API_URL</span>
          <span>{ORDINALSBOT_MARKETPLACE_API_URL}</span>
        </div>
      </div>
    </Section>
  );
}
