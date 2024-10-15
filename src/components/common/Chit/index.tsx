import { mapComponentVariantsToColor } from '@/lib/utilities';
import { EComponentVariants } from '@/types';

interface ChitProps {
  label: string;
  variant?: EComponentVariants;
}
export default function Chit({ label, variant = EComponentVariants.Default }: ChitProps) {
  const { bg, border, text } = mapComponentVariantsToColor(variant);
  return (
    <div
      className={`flex max-h-[--button-height-sm] min-w-[--button-width-md] items-center justify-center rounded-full p-1 px-2 ${bg} ${border}`}
    >
      <span className={`${text} text-sm`}>{label}</span>
    </div>
  );
}
