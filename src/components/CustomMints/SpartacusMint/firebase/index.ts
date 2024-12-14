import { ENV, ENVS } from '@/lib/constants';
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';

const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_SPARTACUS_FIREBASE_PUBLIC_API_KEY,
  projectId: process.env.NEXT_PUBLIC_SPARTACUS_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_SPARTACUS_FIREBASE_APP_ID
};

const SPARTACUS_APP_NAME = 'spartacus';
export const getSpartacusApp = (): FirebaseApp | null => {
  if (ENV !== ENVS.PROD) {
    console.warn('Attempted to initialize Spartacus app outside of production environment');
    return null;
  }

  try {
    // Check if app is already initialized
    const existingApp = getApps().find((app) => app.name === SPARTACUS_APP_NAME);
    if (existingApp) {
      return existingApp;
    }

    // Initialize new app if not already initialized
    return initializeApp(firebaseClientConfig, SPARTACUS_APP_NAME);
  } catch (error) {
    console.error('Failed to initialize Firebase client app:', error);
    throw error; // Re-throw for proper error handling
  }
};
