export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
};

export type TUserRole = keyof typeof USER_ROLE;

export const Role: TUserRole[] = ['admin', 'user'];
