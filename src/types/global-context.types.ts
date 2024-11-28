import { Disclosure } from '@/lib/hooks/useDisclosure';
import { TPointsMapping } from './pointsConfig';

export enum EMenuType {
  PROFILE = 'profile',
  ACTIVITY = 'activity',
  SEARCH = 'search',
  WALLET = 'wallet',
  FEE = 'fee',
  MOBILE = 'mobile'
}

export interface IGlobalContext {
  menuDisclosure: Disclosure;
  menuType: EMenuType;
  menuBG: string;
  setMenuType: (type: EMenuType) => void;
  pointsConfig: TPointsMapping | null;
}
