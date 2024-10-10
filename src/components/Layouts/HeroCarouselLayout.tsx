import ArtistCarousel from '../Carousel/ArtistCarousel';
import { Container } from '../Container';
import { Button } from '../ui/button';

export default function HeroCarouselLayout({
  title,
  description,
  buttons
}: {
  title: string;
  description: string;
  buttons: { link: string; text: string }[];
}) {
  const [button1, button2] = buttons;
  return (
    <div className='h-full bg-ob-black-light py-[--section-vertical-padding]'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-8 pt-[var(--header-height)]'>
        <Container padding>
          <div className='flex h-full w-full flex-row items-center justify-center'>
            <div className='flex h-full w-1/2 flex-col items-center justify-center gap-8 bg-ob-black-light py-24'>
              <h1 className='font-bold'>{title}</h1>
              <span className='text-center text-lg font-thin text-ob-grey-lightest'>{description}</span>
              <div className='flex flex-row justify-between gap-8'>
                <Button variant='secondary'>{button1.text}</Button>
                <Button>{button2.text}</Button>
              </div>
            </div>
          </div>
        </Container>
        <ArtistCarousel />
      </div>
    </div>
  );
}
