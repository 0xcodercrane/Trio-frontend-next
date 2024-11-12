'use client';
import { signIn, signOut } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { IAuthContext, IWallet } from '../../../types/auth.types';
import { onAuthStateChanged, signInWithCustomToken, User } from 'firebase/auth';
import { auth, firestore } from '@/lib/firebase';
import { ESUPPORTED_WALLETS, WALLET_COOKIE, WALLET_SIGN_IN_MESSAGE } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { EUserRole, RoleValues, TUser, TUserProfile } from '@/types/user.types';
import { useLaserEyes } from '@omnisat/lasereyes';
import { toast } from 'sonner';
import { GlobalContext } from '../GlobalContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContext = createContext<IAuthContext>({} as any);

const AuthContextProvider = ({ children }: { children: NonNullable<ReactNode> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  const { menuDisclosure } = useContext(GlobalContext);

  const {
    connected,
    address,
    publicKey,
    signMessage,
    paymentAddress,
    paymentPublicKey,
    provider,
    isInitializing,
    network,
    getNetwork,
    switchNetwork
  } = useLaserEyes();

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
          points: points.data()?.currentBalance
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

  const signIntoFirebase = async (address: string, signature: string) => {
    try {
      const response = await fetch('/api/auth/customToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, signature }) // Send the address and its signature
      });

      if (!response.ok) {
        throw new Error('Failed to fetch custom token');
      }

      const data = await response.json();
      const customToken = data.customToken;

      // Use the custom token to authenticate with Firebase
      try {
        await signInWithCustomToken(auth, customToken);

        const idToken = await auth.currentUser?.getIdToken(true);
        if (idToken) {
          // Sign in with next-auth, which establishes a session
          await signIn('credentials', { redirect: false, idToken });
          return true;
        }
      } catch (error) {
        console.error('Error signing in with custom token:', error);
        return false;
      }
    } catch (error) {
      console.error('Fetch Error: ', error);
      return false;
    }
  };

  useEffect(() => {
    if (isInitializing || auth.currentUser || loading) return;

    // Only prompt to sign a message if the wallet is connected, but firebase has no authenticated user
    if (connected) {
      const signMessageForFirebase = async (wallet: ESUPPORTED_WALLETS) => {
        try {
          const signedMessage = await signMessage(WALLET_SIGN_IN_MESSAGE, address);
          if (!signedMessage) {
            logout();
            return toast.error('Failed to sign message');
          }
          const signInResult = await signIntoFirebase(address, signedMessage);

          if (signInResult) {
            menuDisclosure.close();
            return loginWithWallet({
              ordinalsAddress: address,
              ordinalsPublicKey: publicKey,
              paymentAddress,
              paymentPublicKey,
              wallet
            });
          }
        } catch (error) {
          toast.error('User rejected request');
          logout();
        }
      };

      signMessageForFirebase(provider);
    }
  }, [connected]);

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
