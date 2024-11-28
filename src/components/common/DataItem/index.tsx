export const DataItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex flex-col'>
      <span className='text-sm capitalize text-ob-yellow'>{label}</span>
      <span className='text-lg text-white'>{value}</span>
    </div>
  );
};
