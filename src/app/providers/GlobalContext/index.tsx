'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { EMenuType, IGlobalContext } from '@/types/global-context.types';
import { useDisclosure } from '@/lib/hooks';
import { AuthContext } from '../AuthContext';
import { TPointsConfigInstance, TPointsMapping } from '@/types/pointsConfig';
import { pointsConfigRef } from '@/lib/firebase/references';
import { onSnapshot } from 'firebase/firestore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlobalContext = createContext<IGlobalContext>({} as any);

const GlobalContextProvider = ({ children }: { children: NonNullable<ReactNode> }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const menuDisclosure = useDisclosure(false);
  const [menuType, setMenuType] = useState<EMenuType>(EMenuType.PROFILE);
  const [pointsConfig, setPointsConfig] = useState<TPointsMapping | null>(null);

  const menuBG = useMemo(() => {
    if (!menuDisclosure.isOpen) return 'transparent';
    switch (menuType) {
      case EMenuType.PROFILE:
        return 'bg-ob-purple-darkest';
      case EMenuType.WALLET:
        return 'bg-ob-purple-darkest';
      case EMenuType.ACTIVITY:
      default:
        return 'bg-ob-purple-dark';
    }
  }, [menuType, menuDisclosure.isOpen]);

  useEffect(() => {
    const unsubscribe = onSnapshot(pointsConfigRef, (snapshot) => {
      const configInstance = snapshot.docs[0].data() as TPointsConfigInstance;
      setPointsConfig(configInstance.config as TPointsMapping);
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    menuDisclosure.close();
  }, [isAuthenticated]);

  return (
    <GlobalContext.Provider
      value={{
        menuDisclosure,
        menuBG,
        menuType,
        setMenuType,
        pointsConfig
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
