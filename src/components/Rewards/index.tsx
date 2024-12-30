import Section from '@/components/Section';
import FAQ from '../FAQ';
import { Pools } from '../Pools';
import { XPMining } from '../XPMining';

export default function Rewards() {
  return (
    <Section className='bg-ob-purple-darkest'>
      <Pools />
      <XPMining />
      <FAQ />
    </Section>
  );
}
