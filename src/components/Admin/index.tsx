'use client';

import { AuthContext } from '@/app/providers/AuthContext';
import { useContext } from 'react';
import LoadingScreen from '../common/LoadingScreen';
import { EUserRole } from '@/types';
import Section from '../Section';
import { XPMiningAdmin } from './XPMiningAdmin';
import { NetworkAdmin } from './NetworkAdmin';
import { PointsAdmin } from './PointsAdmin';
import NotFound from '@/app/not-found';

export function Admin() {
  const { loading, isAuthenticated, user } = useContext(AuthContext);

  if (loading) return <LoadingScreen />;
  if (isAuthenticated && !user) return <LoadingScreen />;
  if (!isAuthenticated) return <NotFound />;
  if (user?.roles?.includes(EUserRole.ADMIN) === false) return <NotFound />;

  return (
    <Section className='bg-ob-purple-darkest'>
      <span>Admin</span>
      <div className='grid grid-cols-2 gap-4'>
        <NetworkAdmin />
        <XPMiningAdmin />
        <PointsAdmin />
      </div>
    </Section>
  );
}
