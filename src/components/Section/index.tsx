import { Container } from '@/components/Container';

export default function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`h-auto w-full bg-ob-black-lighter py-[--section-vertical-padding] ${className}`}>
      <Container padding>{children}</Container>
    </div>
  );
}
