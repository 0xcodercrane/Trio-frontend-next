export default function FeesPanel() {
  return (
    <div className='flex flex-col gap-4 rounded-lg bg-ob-grey p-4'>
      <div className='flex w-full flex-row text-ob-grey-lightest'>
        <div className='basis-1/2'>List Price:</div>
        <div className='basis-1/4'>0.00 BTC</div>
        <div className='basis-1/4'>0.00</div>
      </div>
      <div className='flex w-full flex-row text-ob-grey-lightest'>
        <div className='basis-1/2'>Taker Fee (2%):</div>
        <div className='basis-1/4'>0.00 BTC</div>
        <div className='basis-1/4'>0.00</div>
      </div>
      <div className='flex w-full flex-row text-white'>
        <div className='basis-1/2'>Total:</div>
        <div className='basis-1/4'>0.00 BTC</div>
        <div className='basis-1/4'>0.00</div>
      </div>
    </div>
  );
}
