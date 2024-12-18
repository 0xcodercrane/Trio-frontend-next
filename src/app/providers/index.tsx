'use client';

import { FC, ReactNode, useState } from 'react';

import { Session } from 'next-auth';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import AuthContextProvider from './AuthContext';

import { NETWORK, ONE_MINUTE, TOOLTIP_HOVER_DELAY } from '@/lib/constants';
import { LaserEyesProvider } from '@omnisat/lasereyes';
import GlobalContextProvider from './GlobalContext';
import { mapAppNetworkToLaserEyesNetwork } from '@/lib/utilities';
import { TooltipProvider } from '@/components/ui/tooltip';

interface ProvidersProps {
  children: NonNullable<ReactNode>;
  session: Session | null;
}

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

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <LaserEyesProvider config={{ network: mapAppNetworkToLaserEyesNetwork(NETWORK) }}>
        <SessionProvider session={session} refetchInterval={5 * ONE_MINUTE.as('seconds')} refetchOnWindowFocus={true}>
          <QueryClientProvider client={client}>
            <AuthContextProvider>
              <GlobalContextProvider>
                <TooltipProvider delayDuration={TOOLTIP_HOVER_DELAY}>{children}</TooltipProvider>
              </GlobalContextProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </LaserEyesProvider>
    </ThemeProvider>
  );
};

export default Providers;
