
export enum EUserRole {
  ADMIN = 'admin',
  TEAM = 'team',
  CREATOR = 'creator'
};

export const RoleValues = Object.values(EUserRole);
export type TUser = {
  id?: string;
  email?: string;
  roles?: EUserRole[];
  newsletter?: boolean;
  defaultAddress?: string;
  profile?: TUserProfile;
};

export type TUserProfile = {
  avatar: string;
  username: string;
};