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
    <Link href={href} target={target} className={`${variants.variant[variant]}`}>
      {buttonTxt}
    </Link>
  );
}
