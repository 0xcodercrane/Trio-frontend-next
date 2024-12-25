'use client';
import { signIn, signOut } from 'next-auth/react';
import { createContext, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithCustomToken, User } from 'firebase/auth';
import { auth, firestore } from '@/lib/firebase';
import { WALLET_SIGN_IN_MESSAGE } from '@/lib/constants';
import {
  collection,
  doc,
  DocumentData,
  getAggregateFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  sum,
  where
} from 'firebase/firestore';
import { EUserRole, RoleValues, TUser, TUserProfile, IAuthContext, IWallet } from '@/types';
import { useLaserEyes } from '@omnisat/lasereyes';
import { toast } from 'sonner';

export const AuthContext = createContext<IAuthContext>({} as any);

const AuthContextProvider = ({ children }: { children: NonNullable<ReactNode> }) => {
  const {
    connected,
    address,
    publicKey,
    signMessage,
    signPsbt,
    paymentAddress,
    paymentPublicKey,
    provider,
    isInitializing,
    isConnecting,
    disconnect
  } = useLaserEyes();

  const listeners = useRef<(() => void)[]>([]); // Store unsubscribe functions

  const [loading, setLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [user, setUser] = useState<TUser | null>(null);

  const isAuthenticated = useMemo(() => (auth?.currentUser ? true : false), [auth.currentUser]);

  // MEMO: This function is called programatically under the condition that
  //       Firebase authentification was successful. That's why it's not a hook.
  const logIn = () => {
    setWallet({
      ordinalsAddress: address,
      ordinalsPublicKey: publicKey,
      paymentAddress,
      paymentPublicKey,
      wallet: provider
    });
  };

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        // Unsubscribe from all listeners
        listeners.current.forEach((unsubscribe) => unsubscribe());
        listeners.current = []; // Reset the listeners list

        // local purge
        setWallet(null);
        setUser(null);
        setLoading(false);

        // disconnect lasereyes
        disconnect();

        // sign out of NextJS session
        signOut({ redirect: false });
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error signing out:', error);
        toast.error('Failed to sign out');
      });
  };

  const authStateChanged = async (firebaseUser: User | null) => {
    // Clear existing listeners before setting up new ones
    listeners.current.forEach((unsubscribe) => unsubscribe());
    listeners.current = []; // Reset the list

    if (firebaseUser) {
      const userRef = doc(firestore, 'users', firebaseUser.uid);
      const profileRef = doc(firestore, 'profiles', firebaseUser.uid);
      const pointsRef = doc(firestore, 'pointsBalances', firebaseUser.uid);
      const syntheticBalanceRef = collection(firestore, `users/${firebaseUser.uid}/stakedBalance`);

      listeners.current.push(
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
        )
      );

      // If the users profile changes, pull those changes into the client
      listeners.current.push(
        onSnapshot(profileRef, (profile: DocumentData) => {
          setUser((prevUser) => ({
            ...prevUser,
            profile: profile.data() as TUserProfile
          }));
        })
      );

      listeners.current.push(
        onSnapshot(pointsRef, (points: DocumentData) => {
          setUser((prevUser) => ({
            ...prevUser,
            points: points.data()?.currentBalance
          }));
        })
      );

      listeners.current.push(
        onSnapshot(query(syntheticBalanceRef, limit(1), orderBy('block', 'desc')), (snap) => {
          if (snap.docs.length > 0) {
            setUser((prevUser) => ({
              ...prevUser,
              syntheticBalance: snap.docs[0].data().balance
            }));
          }
        })
      );

      getAggregateFromServer(
        query(collection(firestore, 'rewards'), where('userId', '==', auth?.currentUser?.uid), where('type', '==', 'stake')),
        {
          totalPoints: sum('amount')
        }
      ).then((totalPoints) => {
        setUser((prevUser) => ({
          ...prevUser,
          totalPointsFromStaking: totalPoints.data().totalPoints || 0
        }));
      });

      setLoading(false);
    } else {
      logOut();
      setLoading(false);
    }
  };

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
    if (isInitializing || loading || isConnecting) return;

    // MEMO: This is needed because of wallets that require connection upon every load - Leather.
    if (!connected) {
      return logOut();
    }

    if (connected) {
      // Only prompt to sign a message if the wallet is connected,
      // but firebase has no authenticated user
      if (!auth.currentUser) {
        setLoading(true);
        const signMessageForFirebase = async () => {
          try {
            const signedMessage = await signMessage(WALLET_SIGN_IN_MESSAGE, address);
            if (!signedMessage) {
              logOut();
              return toast.error('Failed to sign message');
            }
            const signInResult = await signIntoFirebase(address, signedMessage);

            if (signInResult) {
              return logIn();
            } else {
              logOut();
              return toast.error('Failed to sign into Firebase');
            }
          } catch (error) {
            toast.error('User rejected request');
            console.error(error);
            return logOut();
          }
        };

        signMessageForFirebase();
      } else {
        // If the user is authenticated then log in directly
        logIn();
      }
    }
  }, [connected, isInitializing, loading, isConnecting]);

  useEffect(() => {
    // If the user has a wallet, set it as the default wallet if it hasn't already been set
    if (!user?.defaultAddress && wallet?.ordinalsAddress && auth?.currentUser) {
      const userRef = doc(firestore, 'users', auth?.currentUser.uid);
      setDoc(userRef, { defaultAddress: wallet?.ordinalsAddress }, { merge: true });
    }
  }, [user, auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signPsbt,
        isAuthenticated,
        logOut: logOut,
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
