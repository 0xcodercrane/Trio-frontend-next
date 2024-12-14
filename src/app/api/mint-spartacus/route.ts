import { NextResponse } from 'next/server';
import { getSpartacusApp } from '../firebase/spartacusApp';
import ob from '@/components/CustomMints/SpartacusMint/ob';
import { validate } from 'bitcoin-address-validation';
import { InscriptionOrderState } from 'ordinalsbot/dist/types/v1';
import { ENV } from '@/lib/constants';

type TSpartacusFile = {
  address: string;
  fileData: string;
  id: number;
  state: string;
  locked: boolean;
};

type RequestBody = {
  receiveAddress: string;
  feeRate: number;
  fileCount: number;
  useLowPostage: boolean;
};

export async function POST(req: Request) {
  try {
    // get the Spartacus Firebase Admin App
    const admin = getSpartacusApp();
    if (!admin) {
      return NextResponse.json({ message: `Spartacus not configured for ${ENV}` }, { status: 500 });
    }
    const firestore = admin.firestore();
    const filesRef = firestore.collection('files');

    const body = (await req.json()) as RequestBody;

    const { receiveAddress, feeRate, fileCount, useLowPostage } = body;

    // Validate request fields
    if (!receiveAddress || !feeRate || !fileCount) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Validate Bitcoin address
    if (!validate(receiveAddress)) {
      return NextResponse.json({ message: 'Invalid BTC address' }, { status: 400 });
    }

    let lockedFiles: TSpartacusFile[] = [];
    await firestore.runTransaction(async (transaction: FirebaseFirestore.Transaction) => {
      const querySnapshot = await transaction.get(filesRef.where('locked', '==', false).limit(fileCount));

      // Check if enough files were retrieved
      if (querySnapshot.docs.length < fileCount) {
        throw new Error('Not enough files available');
      }

      lockedFiles = querySnapshot.docs.map((doc: FirebaseFirestore.DocumentData) => ({
        id: doc.id,
        ...doc.data()
      })) as TSpartacusFile[];

      // Lock files within the transaction
      querySnapshot.docs.forEach((doc: FirebaseFirestore.DocumentData) => {
        transaction.update(doc.ref, { locked: true });
      });
    });

    const filesForInscription = lockedFiles.map((file) => ({
      dataURL: `data:text/html;base64,${btoa(file.fileData || '')}`,
      name: `${file.id}.html`,
      size: file.fileData.length,
      type: 'text/html'
    }));

    const directInscribeResponse = await ob.Inscription().createDirectOrder({
      files: filesForInscription,
      lowPostage: useLowPostage,
      fee: feeRate,
      receiveAddress,
      webhookUrl: `${process.env.SPARTACUS_WEBHOOK_URL}/api/webhook` // Adjust for your setup
    });

    const usersCollection = firestore.collection('users');
    await usersCollection.add({
      content: JSON.stringify(directInscribeResponse),
      createDate: Date.now(),
      state: InscriptionOrderState.WAITING_PAYMENT,
      id: directInscribeResponse.id,
      amount: directInscribeResponse.charge.amount,
      networkFee: directInscribeResponse.chainFee,
      serviceFee: directInscribeResponse.serviceFee,
      imageURL: directInscribeResponse.files?.map((file) => file.url) || [],
      filesId: lockedFiles.map((file) => file.id) // Save file IDs for reference
    });

    return NextResponse.json(
      {
        id: directInscribeResponse.id,
        amount: directInscribeResponse.charge.amount,
        networkFee: directInscribeResponse.chainFee,
        serviceFee: directInscribeResponse.serviceFee,
        imageURLs: directInscribeResponse.files?.map((file) => file.url) || []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing inscription request:', error.message);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
