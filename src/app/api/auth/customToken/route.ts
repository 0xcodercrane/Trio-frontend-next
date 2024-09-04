import { Verifier } from 'bip322-js';
import admin from '@/app/api/firebase';
import { WALLET_SIGN_IN_MESSAGE } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { address, signature } = await req.json();
    console.log('----- customToken:1');
    console.log(address);
    console.log(signature);
    // verifySignature requires that the entire signature object be passed to it
    const signedResult = Verifier.verifySignature(address, WALLET_SIGN_IN_MESSAGE, signature);
    //!!Important!! Change this!
    // const signedResult = true;

    console.log('----- customToken:2');
    console.log(signedResult);

    if (signedResult) {
      console.log('----- customToken:3');
      const customToken = await admin.auth().createCustomToken(encodeBitcoinAddressToBase64(address));
      console.log('----- customToken:4');
      console.log(customToken);
      return Response.json({ customToken, address, signature });
    } else {
      throw new Error('Invalid signature');
    }
  } catch (error) {
    console.error('Error creating custom token:', error);
    return Response.json({ success: false, error: 'Internal server error' });
  }
}

const encodeBitcoinAddressToBase64 = (address: string) => {
  return Buffer.from(address).toString('base64');
};
