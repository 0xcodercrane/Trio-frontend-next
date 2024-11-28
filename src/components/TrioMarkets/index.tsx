import { TRIO_EXCHANGES } from '@/lib/constants';

export default function TrioMarkets() {
  return (
    <div>
      {TRIO_EXCHANGES.map(({ label, img, link }) => {
        return (
          <a href={link} target='_blank' rel='noreferrer' key={label}>
            <img src={img} alt={label} />
          </a>
        );
      })}
    </div>
  );
}
