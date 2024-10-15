import { Container } from '@/components/Container';

export default function Section({
  children,
  className,
  padding = true,
  paddingLeft = false
}: {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  paddingLeft?: boolean;
}) {
  return (
    <div className={`h-auto min-h-[66vh] w-full py-[--section-vertical-padding] ${className ? className : ''}`}>
      <Container padding={padding} paddingLeft={paddingLeft}>
        {children}
      </Container>
    </div>
  );
}
