import React from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MARKETPLACE_TRIO_DISCOUNT_THRESHOLD } from '@/lib/constants';

const ZeroFeeDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        {' '}
        <Button className='h-min rounded-full border px-3 py-1 font-bold' variant='outline'>
          Get 0% Fees
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-xl rounded-xl border-0 bg-ob-purple-dark p-12'>
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
          <Button className='font-bold'>Buy TRIO Now</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export { ZeroFeeDialog };
