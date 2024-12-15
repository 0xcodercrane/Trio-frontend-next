import { ESOCIALS, IMG_DIR } from '@/lib/constants';
import { Link } from 'lucide-react';

export const getSocialIcon = (social: ESOCIALS) => {
  return `${IMG_DIR}/socials/${social}.svg`;
};
