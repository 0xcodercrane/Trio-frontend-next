'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { EMenuType, IGlobalContext } from '@/types/global-context.types';
import { useDisclosure } from '@/lib/hooks';
import { AuthContext } from '../AuthContext';

export const GlobalContext = createContext<IGlobalContext>({} as any);

const GlobalContextProvider = ({
  children,
}: {
  children: NonNullable<ReactNode>;
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const menuDisclosure = useDisclosure(false);
  const [menuType, setMenuType] = useState<EMenuType>(EMenuType.PROFILE);

  useEffect(() => {
    if (!isAuthenticated) {
      menuDisclosure.close();
    }
  }, [isAuthenticated]);

  return (
    <GlobalContext.Provider
      value={{
        menuDisclosure,
        menuType,
        setMenuType,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
