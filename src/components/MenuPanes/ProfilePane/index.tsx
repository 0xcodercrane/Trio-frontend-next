import { AuthContext } from '@/app/providers/AuthContext';
import { Avatar } from '@/components/common';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { shortenAddress } from '@/lib/utilities';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useContext, useState } from 'react';
import { BuyTrioTab } from './BuyTrio';

enum EProfilePanes {
  ACCOUNT = 'account',
  BUY_TRIO = 'buy trio',
  ORDERS = 'orders',
  COLLECTED = 'collected',
  POINTS = 'points'
}

const ProfilePaneValues = Object.values(EProfilePanes);

const ProfilePaneConfig = {
  [EProfilePanes.ACCOUNT]: () => <div className='text-white'>Account</div>,
  [EProfilePanes.BUY_TRIO]: () => <BuyTrioTab />,
  [EProfilePanes.ORDERS]: () => <div className='text-white'>Orders</div>,
  [EProfilePanes.COLLECTED]: () => <div className='text-white'>Collected</div>,
  [EProfilePanes.POINTS]: () => <div className='text-white'>Points</div>
};

export default function ProfilePane() {
  const { wallet, logout } = useContext(AuthContext);
  const { disconnect } = useLaserEyes();
  const [activePane, setActivePane] = useState<EProfilePanes>(EProfilePanes.ACCOUNT);

  return (
    <Container>
      <div className='flex gap-4 flex-col px-4 md:px-16 2xl:px-0'>
        <div className='flex min-h-[128px] max-w-[25%] flex-row items-center gap-4'>
          <div className='flex h-full w-full flex-1 justify-center'>
            <Avatar />
          </div>
          <div className='flex flex-1 flex-col justify-start text-white'>
            <h2 className='text-2xl'>Account</h2>
            <span>{shortenAddress(wallet?.ordinalsAddress!)}</span>
          </div>
          <div className='flex flex-1 flex-row justify-start'>
            <Button
              variant='destructive'
              onClick={() => {
                logout();
                disconnect();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className='flex flex-row flex-wrap md:flex-nowrap items-center justify-start gap-2'>
          {ProfilePaneValues.map((pane, index) => (
            <div
              className={`bg-ob-grey flex min-h-[48px] items-center justify-center rounded-full capitalize text-white ${activePane === pane ? '!bg-white !text-ob-black' : ''} cursor-pointer`}
              onClick={() => setActivePane(pane)}
              key={index}
            >
              <span className='px-8 py-4'>{pane}</span>
            </div>
          ))}
        </div>
        <div className='mt-2' >{ProfilePaneConfig[activePane]()}</div>
      </div>
    </Container>
  );
}
