import numeral from 'numeral';

export const LotteryInfo = ({
  totalEstimatedValue,
  totalUserTickets,
  totalNumberOfTicketsSold
}: {
  totalEstimatedValue: number;
  totalUserTickets: number;
  totalNumberOfTicketsSold: number;
}) => {
  return (
    <div className='grid grid-cols-3'>
      <div className='flex flex-col'>
        <span className='text-center text-base text-ob-yellow'>Est. Value</span>
        <span className='text-base-xl text-center'>${numeral(totalEstimatedValue).format('0,0')}</span>
      </div>

      <div className='flex flex-col'>
        <span className='text-center text-base text-ob-yellow'>Win %</span>
        <span className='text-base-xl text-center'>
          {((totalUserTickets / (totalNumberOfTicketsSold === 0 ? 1 : totalNumberOfTicketsSold)) * 100).toFixed(2)}
        </span>
      </div>

      <div className='flex flex-col'>
        <span className='text-center text-base text-ob-yellow'>Your # Of Tickets</span>
        <span className='text-base-xl text-center'>{totalUserTickets}</span>
      </div>
    </div>
  );
};
