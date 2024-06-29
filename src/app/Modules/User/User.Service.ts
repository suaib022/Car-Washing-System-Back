import { TUser } from './User.Interface';

const registerUserIntoDB = async (payload: TUser) => {
  return true;
};

export const UserServices = {
  registerUserIntoDB,
};
