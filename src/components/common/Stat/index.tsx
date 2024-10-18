interface StatProps {
  label: string;
  value: string | number;
}

export default function Stat({ label, value }: StatProps) {
  return (
    <div className='rounded-lg border-none bg-ob-grey text-white'>
      <div className='flex flex-col items-center px-8 py-4 font-semibold'>
        <span className='text-sm'>{label}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}
