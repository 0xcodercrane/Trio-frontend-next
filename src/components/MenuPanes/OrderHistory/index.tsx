import { TrioAccountOrdersTable } from '@/components/Tables';
import { useTrioAccountsOrderHistory } from '@/lib/services/';

export default function OrderHistory() {
  const { orders, loading } = useTrioAccountsOrderHistory();

  return <TrioAccountOrdersTable loading={loading} orders={orders} />;
}
