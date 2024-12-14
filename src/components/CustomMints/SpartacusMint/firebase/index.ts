import { ENV, ENVS } from '@/lib/constants';
import { initializeApp, getApp, FirebaseApp } from 'firebase/app';

const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_SPARTACUS_FIREBASE_PUBLIC_API_KEY,
  projectId: process.env.NEXT_PUBLIC_SPARTACUS_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_SPARTACUS_FIREBASE_APP_ID
};

const SPARTACUS_APP_NAME = 'spartacus';
const app: FirebaseApp | null = null;
export const getSpartacusApp = (): FirebaseApp | null => {
  if (ENV !== ENVS.PROD) return null;
  if (!app) {
    return initializeApp(firebaseClientConfig, SPARTACUS_APP_NAME);
  } else {
    return getApp(SPARTACUS_APP_NAME);
  }
};
