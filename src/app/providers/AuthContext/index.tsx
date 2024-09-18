'use client';
import { signOut } from 'next-auth/react';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { IAuthContext, IWallet } from '../../../types/auth.types';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, firestore } from '@/lib/firebase';
import { WALLET_COOKIE } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { EUserRole, RoleValues, TUser, TUserProfile } from '@/types/user.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContext = createContext<IAuthContext>({} as any);

const AuthContextProvider = ({ children }: { children: NonNullable<ReactNode> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  const isAuthenticated = useMemo(() => {
    return auth?.currentUser ? true : false;
  }, [auth.currentUser]);

  const loginWithWallet = (wallet: IWallet) => {
    localStorage.setItem(WALLET_COOKIE, JSON.stringify(wallet));
    setWallet(wallet);
  };

  const logout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem(WALLET_COOKIE);
      setWallet(null);
      setUser(null);
      signOut({ redirect: false });
    });
  };

  const authStateChanged = async (firebaseUser: User | null) => {
    if (firebaseUser) {
      // Initialize wallet from local storage
      const localWallet = JSON.parse(localStorage.getItem(WALLET_COOKIE) || 'null');

      if (localWallet) {
        setWallet(localWallet);
      }

      const userRef = doc(firestore, 'users', firebaseUser.uid);
      const profileRef = doc(firestore, 'profiles', firebaseUser.uid);
      const pointsRef = doc(firestore, 'pointsBalances', firebaseUser.uid);

      onSnapshot(
        userRef,
        async (userData: DocumentData) => {
          const { claims } = await firebaseUser.getIdTokenResult();
          setUser((prevUser) => ({
            ...prevUser,
            ...userData.data(),
            roles: RoleValues.filter((role: EUserRole) => claims[role])
          }));
        },
        (error) => {
          console.log('----- catching firestore error');
          console.log(error);
        }
      );

      // If the users profile changes, pull those changes into the client
      onSnapshot(profileRef, (profile: DocumentData) => {
        setUser((prevUser) => ({
          ...prevUser,
          profile: profile.data() as TUserProfile
        }));
      });

      onSnapshot(pointsRef, (points: DocumentData) => {
        setUser((prevUser) => ({
          ...prevUser,
          points: points.data().currentBalance
        }));
      });
      setLoading(false);
    } else {
      logout();
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginWithWallet,
        logout,
        loading,
        wallet,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
