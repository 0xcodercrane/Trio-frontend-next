'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { EMenuType, IGlobalContext } from '@/types/global-context.types';
import { useDisclosure } from '@/lib/hooks';
import { AuthContext } from '../AuthContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlobalContext = createContext<IGlobalContext>({} as any);

const GlobalContextProvider = ({ children }: { children: NonNullable<ReactNode> }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const menuDisclosure = useDisclosure(false);
  const [menuType, setMenuType] = useState<EMenuType>(EMenuType.PROFILE);

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
    menuDisclosure.close();
  }, [isAuthenticated]);

  return (
    <GlobalContext.Provider
      value={{
        menuDisclosure,
        menuBG,
        menuType,
        setMenuType
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
