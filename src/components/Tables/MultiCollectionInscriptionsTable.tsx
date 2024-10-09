import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { MediaWrapper } from '../common/MediaViewer';
import { RandomInscriptionRow } from '@/lib/supabase/inscriptions';

//TODO - Figure out the type for objects receives as a result of a join from supabase
export default function MultiCollectionInscriptionsTable({
  inscriptions,
  nextPageLoading
}: {
  inscriptions: RandomInscriptionRow[];
  nextPageLoading: boolean;
}) {
  if (!inscriptions) return null;
  return (
    <div className='w-full'>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
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
                  <div className='flex h-[--inscripiton-tiniest] flex-row items-center gap-2'>
                    <MediaWrapper
                      id={inscription.inscription_id}
                      size={48}
                      square
                      blur={nextPageLoading}
                      className={`relative overflow-hidden rounded-sm`}
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
