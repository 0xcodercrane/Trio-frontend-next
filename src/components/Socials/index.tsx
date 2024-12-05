import { TSocialsConfig } from '@/types/socials';
import Image from 'next/image';
import Link from 'next/link';

export default function Socials({ config }: { config: TSocialsConfig }) {
  return (
    <>
      {Object.values(config).map(({ link, img }, key) => {
        return (
          <Link key={key} href={link} target='_blank'>
            <Image src={img} alt={`${key} link`} width={24} height={24} />
          </Link>
        );
      })}
    </>
  );
}
