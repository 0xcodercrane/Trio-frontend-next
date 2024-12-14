import { ENV, ENVS } from '@/lib/constants';
import * as admin from 'firebase-admin';

const ServiceAccount: admin.ServiceAccount = {
  projectId: process.env.SPARTACUS_FIREBASE_ADMIN_PROJECT_ID,
  privateKey: process.env.SPARTACUS_FIREBASE_ADMIN_PRIVATE_KEY,
  clientEmail: process.env.SPARTACUS_FIREBASE_ADMIN_CLIENT_EMAIL
};

const SPARTACUS_APP_NAME = 'spartacus';

export const getSpartacusApp = () => {
  if (ENV !== ENVS.PROD) return null;
  try {
    return admin.app(SPARTACUS_APP_NAME);
  } catch (error) {
    console.log(error);
    return admin.initializeApp(
      {
        serviceAccountId: process.env.SPARTACUS_FIREBASE_ADMIN_CLIENT_EMAIL,
        projectId: process.env.SPARTACUS_FIREBASE_ADMIN_PROJECT_ID,
        credential: admin.credential.cert(ServiceAccount)
      },
      SPARTACUS_APP_NAME
    );
  }
};
