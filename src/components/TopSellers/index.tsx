import { MediaWrapper } from '@/components/common';
import { Container } from '@/components/Container';

export default function TopSellers() {
  return (
    <div className='w-full bg-ob-purple-dark py-[--section-vertical-padding]'>
      <Container padding>
        <div className='flex w-full flex-col gap-8'>
          <div className='flex w-full flex-row items-center justify-between'>
            <h2>Top Sellers</h2>
            <span>View All (100)</span>
          </div>
          <div className='flex w-full flex-row gap-4'>
            <div className='flex basis-1/5 flex-col gap-4 rounded-xl bg-ob-purple-lighter p-8'>
              {Array.from({ length: 3 }).map((_, index) => {
                return (
                  <div className='flex flex-row items-center gap-4' key={index}>
                    <span className='px-2'>#{index + 1}</span>
                    <MediaWrapper size={60} square className='relative overflow-hidden rounded-xl' />
                    <div className='flex flex-grow flex-col items-start text-left'>
                      <span>Satoshi XL</span>
                      <span className='text-left text-ob-text-grey'>22 BTC</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='flex basis-4/5 flex-row gap-4 rounded-xl bg-ob-purple-light p-8'>
              <div className='flex basis-1/4 flex-col flex-wrap gap-4'>
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div className='flex flex-row items-center gap-4' key={index}>
                      <span className='px-2'>#{index + 4}</span>
                      <MediaWrapper size={60} square className='relative overflow-hidden rounded-xl' />
                      <div className='flex flex-grow flex-col items-start text-left'>
                        <span>Satoshi XL</span>
                        <span className='text-left text-ob-text-grey'>22 BTC</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='flex basis-1/4 flex-col flex-wrap gap-4'>
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div className='flex flex-row items-center gap-4' key={index}>
                      <span className='px-2'>#{index + 4}</span>
                      <MediaWrapper size={60} square className='relative overflow-hidden rounded-xl' />
                      <div className='flex flex-grow flex-col items-start text-left'>
                        <span>Satoshi XL</span>
                        <span className='text-left text-ob-text-grey'>22 BTC</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='flex basis-1/4 flex-col flex-wrap gap-4'>
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div className='flex flex-row items-center gap-4' key={index}>
                      <span className='px-2'>#{index + 4}</span>
                      <MediaWrapper size={60} square className='relative overflow-hidden rounded-xl' />
                      <div className='flex flex-grow flex-col items-start text-left'>
                        <span>Satoshi XL</span>
                        <span className='text-left text-ob-text-grey'>22 BTC</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='flex basis-1/4 flex-col flex-wrap gap-4'>
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div className='flex flex-row items-center gap-4' key={index}>
                      <span className='px-2'>#{index}</span>
                      <MediaWrapper size={60} square className='relative overflow-hidden rounded-xl' />
                      <div className='flex flex-grow flex-col items-start text-left'>
                        <span>Satoshi XL</span>
                        <span className='text-left text-ob-text-grey'>22 BTC</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
