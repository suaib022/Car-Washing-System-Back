import { Model } from 'mongoose';
import { TUserRole } from './User.Constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  role: TUserRole;
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
