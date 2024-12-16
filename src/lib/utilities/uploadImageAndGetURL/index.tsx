import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const uploadImageAndGetURL = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    if (snapshot) {
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } else {
      throw new Error('Error uploading image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
