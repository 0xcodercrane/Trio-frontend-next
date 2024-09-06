import { IDisclosure } from '@/lib/hooks';

export enum EMenuType {
  PROFILE = 'profile',
  ACTIVITY = 'activity',
  SEARCH = 'search',
  WALLET = 'wallet',
  FEE = 'fee',
  MOBILE = 'mobile'
} 

export interface IGlobalContext {
  menuDisclosure: IDisclosure;
  menuType: EMenuType;
  menuBG: string;
  setMenuType: (type: EMenuType) => void;
}