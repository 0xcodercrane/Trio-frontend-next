import { AuthContext } from '@/app/providers/AuthContext';
import { Avatar } from '@/components/common';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { shortenAddress } from '@/lib/utilities';
import { useLaserEyes } from '@omnisat/lasereyes';
import { useContext, useState } from 'react';
import { BuyTrioTab } from './BuyTrio';
import { PointsPane } from '../PointsPane/PointsPane';

enum EProfilePanes {
  ACCOUNT = 'account',
  BUY_TRIO = 'buy trio',
  ORDERS = 'orders',
  COLLECTED = 'collected',
  POINTS = 'trio points'
}

const ProfilePaneValues = Object.values(EProfilePanes);

const ProfilePaneConfig = {
  [EProfilePanes.ACCOUNT]: () => <div className='text-white'>My Account</div>,
  [EProfilePanes.BUY_TRIO]: () => <BuyTrioTab />,
  [EProfilePanes.ORDERS]: () => <div className='text-white'>Orders</div>,
  [EProfilePanes.COLLECTED]: () => <div className='text-white'>Collected</div>,
  [EProfilePanes.POINTS]: () => <PointsPane />
};

export default function ProfilePane() {
  const { wallet, logout } = useContext(AuthContext);
  const { disconnect } = useLaserEyes();
  const [activePane, setActivePane] = useState<EProfilePanes>(EProfilePanes.ACCOUNT);

  return (
    <Container>
      <div className='flex flex-col gap-4 px-4 md:px-16 2xl:px-0'>
        <div className='flex min-h-[128px] max-w-[25%] flex-row items-center gap-4'>
          <div className='flex h-full w-full flex-1 justify-center'>
            <Avatar />
          </div>
          <div className='flex flex-1 flex-col justify-start text-white'>
            <h2 className='text-2xl'>Account</h2>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
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
        <div className='flex flex-row flex-wrap items-center justify-start gap-2 md:flex-nowrap'>
          {ProfilePaneValues.map((pane, index) => (
            <div
              className={`flex min-h-[48px] items-center justify-center rounded-full bg-ob-grey capitalize text-white ${activePane === pane ? '!bg-white' : ''} cursor-pointer`}
              onClick={() => setActivePane(pane)}
              key={index}
            >
              <span className={`px-8 py-4 ${activePane === pane ? '!text-ob-black' : ''}`}>{pane}</span>
            </div>
          ))}
        </div>
        <div className='mt-3'>{ProfilePaneConfig[activePane]()}</div>
      </div>
    </Container>
  );
}
