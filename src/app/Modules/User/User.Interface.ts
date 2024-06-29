import { Model } from 'mongoose';

export type TRole = 'admin' | 'user';
export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  doesUserExists(email: string): Promise<TUser>;

  doesPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
