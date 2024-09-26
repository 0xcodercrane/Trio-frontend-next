import { Inscription } from '@/types/database.types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

//TODO - Figure out the type for objects receives as a result of a join from supabase
export default function InscriptionsTable({ inscriptions }: { inscriptions: Inscription[] }) {
  return (
    <div className='w-full'>
      <Table className='w-full'>
        <TableHeader>
          <TableHead>Name</TableHead>
          <TableHead>Chain</TableHead>
          <TableHead>Floor</TableHead>
          <TableHead>% Change</TableHead>
          <TableHead>Vol (30D)</TableHead>
          <TableHead>Vol (7D)</TableHead>
          <TableHead>Assets</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead></TableHead>
        </TableHeader>
        <TableBody style={{ gap: 4 }}>
          {inscriptions.slice(0, 8).map((inscription, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <div className='flex h-[48px] flex-row items-center gap-2'>
                    <div className='h-[48px] w-[48px] rounded-lg bg-ob-grey-lightest'></div>
                    <span className='text-lg font-bold'>{inscription.name}</span>
                  </div>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
