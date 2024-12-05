import { variants } from '@/components/ui/button';
import Link from 'next/link';

export function ButtonLink({
  href,
  buttonTxt,
  variant = 'default',
  target = '_self'
}: {
  href: string;
  buttonTxt: string;
  variant?: 'default' | 'outline';
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      className={`inline-flex h-[--button-height-md] max-h-[--max-button-height] w-auto min-w-[80px] max-w-[160px] items-center justify-center whitespace-nowrap rounded-lg px-8 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&.active]:bg-white [&.active]:text-black ${variants.variant[variant]}`}
    >
      {buttonTxt}
    </Link>
  );
}
