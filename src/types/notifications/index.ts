import { Timestamp } from 'firebase/firestore';

export type TNotification = {
  id: string;
  app: ('global' | 'ordinalsbot.com' | 'trio.xyz' | 'ord.me')[];
  timestamp: Timestamp;
  read: boolean;
  payload: {
    type: TNotificationType;
    title: string;
    data?: any;
    link?: string;
  };
};

export type TNotificationType = 'price-update' | 'snipe' | 'sold-ordinal' | 'bought-ordinal';
