import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MARKETPLACE_TRIO_DISCOUNT_THRESHOLD, TRIO_EXCHANGES } from '@/lib/constants';
import { ButtonLink } from '../common/ButtonLink';
import { CandlestickChart } from 'lucide-react';
import { Img } from '../Img';

const ZeroFeeDialog = () => {
  const [showExchanges, setShowExchanges] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>
        <Button className='h-min rounded-full border px-3 py-1 font-bold' variant='outline'>
          Get 0% Fees
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-xl rounded-xl border-0 bg-ob-purple-dark p-12 text-white'>
        <DialogHeader className='flex flex-col items-center gap-8'>
          <DialogTitle>
            <h3 className='text-center'>
              Get <span className='italic text-ob-yellow'>0%</span> Marketplace Fees!
            </h3>
          </DialogTitle>
          <DialogDescription className='text-md items-center text-center font-semibold text-white/60'>
            For the first month of our launch, through to 17th January 2025, we are offering 0% marketplace fees if you own{' '}
            <span className='font-bold'>{MARKETPLACE_TRIO_DISCOUNT_THRESHOLD} TRIO or more</span>. We will then launch our
            Trio Membership scheme with many more added benefits.
          </DialogDescription>
          <div className='text-center'>
            {showExchanges ? (
              <>
                <div className='mb-6 text-xl font-bold'>Buy TRIO</div>
                <div className='flex flex-wrap items-center justify-center gap-2'>
                  {TRIO_EXCHANGES.map(({ label, link, img }) => (
                    <ButtonLink variant='outline' target='_blank' key={label} href={link}>
                      <Img
                        fallback={
                          <div className='flex items-center gap-2 text-white'>
                            <CandlestickChart size={48} color='white' />
                            {label}
                          </div>
                        }
                        src={img}
                        alt={label}
                      />
                    </ButtonLink>
                  ))}
                </div>
              </>
            ) : (
              <Button onClick={() => setShowExchanges(true)} className='font-bold'>
                Buy TRIO Now
              </Button>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export { ZeroFeeDialog };
