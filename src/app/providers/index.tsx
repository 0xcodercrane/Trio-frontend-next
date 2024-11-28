'use client';

import { FC, ReactNode, useState } from 'react';

import { Session } from 'next-auth';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import AuthContextProvider from './AuthContext';

import { NETWORK, ONE_MINUTE } from '@/lib/constants';
import { FRACTAL_MAINNET, FRACTAL_TESTNET, LaserEyesProvider, MAINNET, SIGNET, TESTNET, TESTNET4 } from '@omnisat/lasereyes';
import GlobalContextProvider from './GlobalContext';
import { mapAppNetworkToLaserEyesNetwork } from '@/lib/utilities';

interface ProvidersProps {
  children: NonNullable<ReactNode>;
  session: Session | null;
}

type NetworkType = 'testnet' | 'mainnet' | 'testnet4' | 'signet' | 'fractal mainnet' | 'fractal testnet';

const Providers: FC<ProvidersProps> = ({ children, session }) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnReconnect: true
        }
      }
    })
  );

  const getNetwork = (): NetworkType => {
    const envNetwork = NETWORK.toLowerCase();

    const allowedNetworks = [TESTNET, MAINNET, TESTNET4, SIGNET, FRACTAL_MAINNET, FRACTAL_TESTNET];

    // Default to 'testnet' if the environment variable is not a valid network
    return allowedNetworks.includes(envNetwork as NetworkType) ? (envNetwork as NetworkType) : 'testnet';
  };

  // In the component
  const network = getNetwork();

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <LaserEyesProvider config={{ network: mapAppNetworkToLaserEyesNetwork(NETWORK) }}>
        <SessionProvider session={session} refetchInterval={5 * ONE_MINUTE.as('seconds')} refetchOnWindowFocus={true}>
          <QueryClientProvider client={client}>
            <AuthContextProvider>
              <GlobalContextProvider>{children}</GlobalContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </LaserEyesProvider>
    </ThemeProvider>
  );
};

export default Providers;
