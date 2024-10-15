import FeesPanel from '@/components/FeesPanel';
import PurchaseComplete from '@/components/PurchaseComplete';

export default function CompletePane() {
  return (
    <div className='flex h-full w-full flex-col gap-8'>
      <FeesPanel />
      <PurchaseComplete />
    </div>
  );
}
