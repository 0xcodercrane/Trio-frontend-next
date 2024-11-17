export default function ChartWrapper({
  children,
  className,
  label
}: {
  children: React.ReactNode;
  className: string;
  label: string;
}) {
  return (
    <div className={`flex flex-col rounded-md bg-white/[0.025] p-4 ${className ? className : ''}`}>
      <div className='mb-4 flex h-[36px] flex-row items-center justify-between'>
        <span className='text-ob-grey-lighter'>{label}</span>
      </div>
      {children}
    </div>
  );
}
