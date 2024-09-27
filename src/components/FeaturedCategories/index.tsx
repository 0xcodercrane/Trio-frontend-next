'use client';

import { Container } from '../Container';
import Favorite from '../Favorite';

export default function FeaturedCategories() {
  return (
    <div className='h-50vh flex w-full justify-center bg-ob-black py-12'>
      <Container padding>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between py-12'>
            <h3>Featured Categories</h3>
            <span>View all Collections (3)</span>
          </div>
          <div className='flex flex-row gap-4'>
            {[
              {
                label: 'BRC20'
              },
              {
                label: 'Runes'
              },
              {
                label: 'Music'
              },
              {
                label: 'Artwork'
              }
            ].map(({ label }, index) => {
              return (
                <div
                  key={index}
                  className='relative flex min-h-[350px] max-w-[350px] items-center justify-start rounded-xl bg-ob-black-light p-6 md:basis-1/4'
                >
                  <div className='absolute right-3 top-3 hover:cursor-pointer hover:opacity-80'>
                    <Favorite action={() => {}} />
                  </div>
                  <h3 className='font-normal'>{label}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
