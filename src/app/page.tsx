import Section from '@/components/Section';
import { DEFAULT_METADATA } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = DEFAULT_METADATA;

export default function Home() {
  return (
    <Section>
      <div>New Content</div>
    </Section>
  );
}
