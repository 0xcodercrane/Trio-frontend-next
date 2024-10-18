import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collection } from '@/types';
import { Button } from '@/components/ui/button';
import CustomFeeInput from '@/components/Inputs/CustomFeeInput';

type TOrder = {
  id: string;
  collection: Partial<Collection>;
  amount: number;
  date: Date;
  bidStatus: 'highest' | 'under' | 'tie';
  currentFee: number;
  maxFee: number;
  totalCost: number;
};

const data: TOrder[] = [
  {
    id: 'b5873d05-9446-4683-88fa-e06e92443e00',
    collection: {
      id: 1,
      slug: 'satoshibles-the-collection',
      name: 'Satoshibles The Collection',
      artist_id: 1,
      artist: {
        name: 'Keegan',
        slug: 'keegan'
      },
      description: 'The first collection of Satoshibles'
    },
    amount: 1,
    date: new Date(),
    bidStatus: 'highest',
    currentFee: 1,
    maxFee: 1,
    totalCost: 0.00032
  },
  {
    id: '7f9c2b3a-6d8e-4f5a-9c1d-2b3e4f5a6c7d',
    collection: {
      id: 1,
      slug: 'satoshibles-the-collection',
      name: 'Satoshibles The Collection',
      artist_id: 1,
      artist: {
        name: 'Keegan',
        slug: 'keegan'
      },
      description: 'The first collection of Satoshibles'
    },
    amount: 2,
    date: new Date('2023-09-15T10:30:00'),
    bidStatus: 'under',
    currentFee: 45,
    maxFee: 45,
    totalCost: 0.00032
  },
  {
    id: 'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
    collection: {
      id: 1,
      slug: 'satoshibles-the-collection',
      name: 'Satoshibles The Collection',
      artist_id: 1,
      artist: {
        name: 'Keegan',
        slug: 'keegan'
      },
      description: 'The first collection of Satoshibles'
    },
    amount: 3,
    date: new Date('2023-11-22T14:45:00'),
    bidStatus: 'tie',
    currentFee: 78,
    maxFee: 78,
    totalCost: 0.00032
  },
  {
    id: 'z9y8x7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4',
    collection: {
      id: 1,
      slug: 'satoshibles-the-collection',
      name: 'Satoshibles The Collection',
      artist_id: 1,
      artist: {
        name: 'Keegan',
        slug: 'keegan'
      },
      description: 'The first collection of Satoshibles'
    },
    amount: 1,
    date: new Date('2024-01-05T09:15:00'),
    bidStatus: 'highest',
    currentFee: 112,
    maxFee: 112,
    totalCost: 0.00032
  },
  {
    id: 'm1n2o3p4-q5r6-s7t8-u9v0-w1x2y3z4a5b6',
    collection: {
      id: 1,
      slug: 'satoshibles-the-collection',
      name: 'Satoshibles The Collection',
      artist_id: 1,
      artist: {
        name: 'Keegan',
        slug: 'keegan'
      },
      description: 'The first collection of Satoshibles'
    },
    amount: 2,
    date: new Date('2023-12-10T16:20:00'),
    bidStatus: 'under',
    currentFee: 89,
    maxFee: 89,
    totalCost: 0.00032
  }
];

export default function UserOrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableHead>Collection</TableHead>
        <TableHead>Items</TableHead>
        <TableHead>Total</TableHead>
        <TableHead>Your Max Fee</TableHead>
        <TableHead>Current Fee</TableHead>
        <TableHead>Bid Status</TableHead>
        <TableHead>Quick Bid</TableHead>
        <TableHead>Action</TableHead>
      </TableHeader>
      <TableBody>
        {data.map(({ bidStatus, collection, totalCost, maxFee, currentFee, amount }, index) => (
          <TableRow key={index} className='rounded-sm border-none text-xs text-white'>
            <TableCell>{collection.name}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{totalCost}</TableCell>
            <TableCell>{maxFee}</TableCell>
            <TableCell>{currentFee}</TableCell>
            <TableCell>
              <span className={`${mapBidStatusToTextColor(bidStatus)} font-bold uppercase`}>{bidStatus}</span>
            </TableCell>
            <TableCell>
              <CustomFeeInput />
            </TableCell>
            <TableCell>
              <Button onClick={() => {}} variant={mapOrderBidStatusToVariant(bidStatus)}>
                Increase Fee
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const mapOrderBidStatusToVariant = (bidStatus: TOrder['bidStatus']) => {
  switch (bidStatus) {
    case 'highest':
      return 'success';
    case 'under':
      return 'destructive';
    case 'tie':
      return 'caution';
    default:
      return 'secondary';
  }
};

const mapBidStatusToTextColor = (bidStatus: TOrder['bidStatus']) => {
  switch (bidStatus) {
    case 'highest':
      return 'text-ob-green';
    case 'under':
      return 'text-ob-red';
    case 'tie':
      return 'text-ob-yellow';
    default:
      return 'text-black';
  }
};
