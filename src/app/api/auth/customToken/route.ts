import { Verifier } from 'bip322-js';
import admin from '@/app/api/firebase';
import { ENETWORK, NETWORK, WALLET_SIGN_IN_MESSAGE } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { address, signature } = await req.json();
    // verifySignature requires that the entire signature object be passed to it
    let signedResult = false;
    if ([ENETWORK.SIGNET, ENETWORK.SIGNET].includes(NETWORK)) {
      // If we're on signet or testnet, then we should bypass the wallet signing
      signedResult = true;
    } else {
      signedResult = Verifier.verifySignature(address, WALLET_SIGN_IN_MESSAGE, signature);
    }

    if (signedResult) {
      const customToken = await admin.auth().createCustomToken(encodeBitcoinAddressToBase64(address));
      return Response.json({ customToken, address, signature });
    } else {
      throw new Error('Invalid signature');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json({ success: false, error: 'Internal server error' });
  }
}

const encodeBitcoinAddressToBase64 = (address: string) => {
  return Buffer.from(address).toString('base64');
};
