import { ESOCIALS, IMG_DIR } from '@/lib/constants';

export const getSocialIcon = (social: ESOCIALS) => {
  return `${IMG_DIR}/socials/${social}.svg`;
};
