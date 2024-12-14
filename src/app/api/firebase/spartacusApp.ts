import { ENV, ENVS } from '@/lib/constants';
import * as admin from 'firebase-admin';

const ServiceAccount: admin.ServiceAccount = {
  projectId: process.env.SPARTACUS_FIREBASE_ADMIN_PROJECT_ID,
  privateKey: process.env.SPARTACUS_FIREBASE_ADMIN_PRIVATE_KEY,
  clientEmail: process.env.SPARTACUS_FIREBASE_ADMIN_CLIENT_EMAIL
};

const SPARTACUS_APP_NAME = 'spartacus';

export const getSpartacusApp = () => {
  if (ENV !== ENVS.PROD) {
    console.warn('Attempted to initialize Spartacus app outside of production environment');
    return null;
  }

  // Check if app is already initialized
  const existingApp = admin.apps.find((app) => app?.name === SPARTACUS_APP_NAME);
  if (existingApp) {
    return existingApp;
  }

  // Initialize the app
  try {
    return admin.initializeApp(
      {
        serviceAccountId: process.env.SPARTACUS_FIREBASE_ADMIN_CLIENT_EMAIL,
        projectId: process.env.SPARTACUS_FIREBASE_ADMIN_PROJECT_ID,
        credential: admin.credential.cert(ServiceAccount)
      },
      SPARTACUS_APP_NAME
    );
  } catch (error) {
    console.error('Failed to initialize Firebase app:', error);
    throw error; // Re-throw error for proper error handling
  }
};
