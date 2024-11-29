import { storage } from '@/lib/firebase';
import { ref, uploadBytes } from 'firebase/storage';

const constructImageURL = (metadata: { bucket: string; fullPath: string }): string => {
  const baseURL = 'https://firebasestorage.googleapis.com/v0/b';
  const { bucket, fullPath } = metadata;
  return `${baseURL}/${bucket}/o/${encodeURIComponent(fullPath)}?alt=media`;
};

export const uploadImageAndGetURL = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    const imageUrl = constructImageURL({
      bucket: snapshot.metadata.bucket,
      fullPath: snapshot.metadata.fullPath
    });

    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
