import Link from 'next/link';

interface TermsAndConditionsProps {
  actionName: string;
}

const TermsAndConditions = ({ actionName }: TermsAndConditionsProps) => (
  <span className='text-bold text-ob-grey-lighter'>
    By clicking &quot;{actionName}&quot; you agree to our&nbsp;
    <Link href='/terms-and-conditions' target='_blank' className='text-ob-grey-lightest'>
      Terms and Conditions
    </Link>
    .
  </span>
);

export { TermsAndConditions };
