import { TPool } from '@/types';
import { Timestamp } from 'firebase/firestore';
import Pool from '../Pool';

const MOCK_POOL_DATA: TPool[] = [
  {
    id: '1',
    name: 'Pool 1',
    img: '/img/placeholder-hero.jpg',
    description: 'Pool 1 description',
    poolPointsBalance: 100000,
    rewards: [
      {
        token: 'BTC',
        amount: 10
      }
    ],
    startDate: Timestamp.now(),
    endDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 1)))
  },
  {
    id: '2',
    name: 'Pool 2',
    img: '/img/placeholder-hero.jpg',
    description: 'Pool 2 description',
    poolPointsBalance: 200000,
    rewards: [
      {
        token: 'USDC',
        amount: 200000
      }
    ],
    startDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 1))),
    endDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 2)))
  },
  {
    id: '3',
    name: 'Pool 3',
    img: '/img/placeholder-hero.jpg',
    description: 'Pool 3 description',
    poolPointsBalance: 300000,
    rewards: [
      {
        token: 'USDC',
        amount: 300000
      }
    ],
    startDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth()))),
    endDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 3)))
  },
  {
    id: '4',
    name: 'Pool 4',
    img: '/img/placeholder-hero.jpg',
    description: 'Pool 4 description',
    poolPointsBalance: 400000,
    rewards: [
      {
        token: 'USDC',
        amount: 400000
      }
    ],
    startDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 3))),
    endDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 4)))
  },
  {
    id: '5',
    name: 'Pool 5',
    img: '/img/placeholder-hero.jpg',
    description: 'Pool 4 description',
    poolPointsBalance: 400000,
    rewards: [
      {
        token: 'USDC',
        amount: 400000
      }
    ],
    startDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 3))),
    endDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 4)))
  },
  {
    id: '6',
    name: 'Pool 6',
    img: '/img/placeholder-hero.jpg',
    description: 'Pool 4 description',
    poolPointsBalance: 400000,
    rewards: [
      {
        token: 'USDC',
        amount: 400000
      }
    ],
    startDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 3))),
    endDate: Timestamp.fromDate(new Date(new Date().setMonth(new Date().getMonth() + 4)))
  }
];
export default function Pools() {
  return (
    <div className='grid grid-cols-3 gap-8'>
      {MOCK_POOL_DATA.map((pool: TPool) => (
        <Pool key={pool.id} pool={pool} />
      ))}
    </div>
  );
}
