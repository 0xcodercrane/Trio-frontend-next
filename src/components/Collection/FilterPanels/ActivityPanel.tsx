'use client';
import { Container } from '@/components/Container';
import { CollectionTradesTable } from '@/components/Tables';
import { useLatestTrades } from '@/lib/services';

const DEFAULT_AMOUNT_OF_TRADES = 50;
export const ActivityPanel = ({ slug }: { slug: string }) => {
  const { data: latestTrades, isLoading } = useLatestTrades('1 month', DEFAULT_AMOUNT_OF_TRADES, slug);

  return (
    <Container>
      <CollectionTradesTable latestTrades={latestTrades || []} isLoading={isLoading} />
    </Container>
  );
};
