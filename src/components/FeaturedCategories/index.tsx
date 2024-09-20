import { Heart } from 'lucide-react';
import { Container } from '../Container';

export default function FeaturedCategories() {
  return (
    <div className='h-50vh flex w-screen justify-center bg-ob-black py-12'>
      <Container padding>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between py-12'>
            <h3>Featured Catgegories</h3>
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
                  <div className='absolute right-3 top-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white hover:cursor-pointer hover:opacity-80'>
                    <Heart color='black' size={15} />
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
