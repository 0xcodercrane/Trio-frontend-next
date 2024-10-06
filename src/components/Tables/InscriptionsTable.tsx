import { Inscription } from '@/types/database.types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { MediaWrapper } from '../common/MediaViewer';

//TODO - Figure out the type for objects receives as a result of a join from supabase
export default function InscriptionsTable({
  inscriptions,
  nextPageLoading
}: {
  inscriptions: Inscription[];
  nextPageLoading: boolean;
}) {
  if (!inscriptions) return null;
  return (
    <div className='w-full'>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>% Change</TableHead>
            <TableHead>Vol (30D)</TableHead>
            <TableHead>Vol (7D)</TableHead>
            <TableHead>Assets</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody style={{ gap: 4 }}>
          {inscriptions.map((inscription, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <div className='flex h-[48px] flex-row items-center gap-2'>
                    <MediaWrapper
                      id={inscription.inscription_id}
                      size={48}
                      square
                      className={`relative rounded-xl ${nextPageLoading ? 'blur-sm' : ''}`}
                    />
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
