import Section from '@/components/Section';
import { Pools } from '../Pools';
import { XPMining } from '../XPMining';

export default function Points() {
  return (
    <Section className='bg-ob-purple-darkest'>
      <Pools />
      <XPMining />
    </Section>
  );
}
