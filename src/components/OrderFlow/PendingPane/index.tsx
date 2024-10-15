import FeesPanel from '@/components/FeesPanel';
import LeadingFee from '@/components/LeadingFee';
import MempoolTx from '@/components/MempoolTx';

export default function PendingPane() {
  return (
    <div className='flex h-full w-full flex-col gap-8'>
      <FeesPanel />
      <LeadingFee orderId={''} />
      <MempoolTx />
    </div>
  );
}
