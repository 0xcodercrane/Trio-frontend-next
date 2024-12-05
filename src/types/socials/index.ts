import { ESOCIALS } from '@/lib/constants';

export type TSocial = {
  img: string;
  link: string;
};

export type TSocialsConfig = Partial<Record<ESOCIALS, TSocial>>;
