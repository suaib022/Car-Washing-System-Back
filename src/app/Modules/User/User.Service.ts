import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TLoginUser, TUser } from './User.Interface';
import { User } from './User.Model';
import { createToken } from '../../Utils/createToken';
import config from '../../config';

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  const newResult = result.toObject();

  delete newResult?.__v;
  delete newResult?.password;

  return newResult;
};

const logInUser = async (payload: TLoginUser) => {
  /**
   * 1. Check if the user exists before in DB by email
   * 2. Check if the password is correct
   * 3. create an jwt accessToken for the user
   * 4. logIn user
   */

  // step - 1
  const user = await User.doesUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
  }

  // step - 2
  if (!(await User.doesPasswordMatch(payload.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match !');
  }

  // step - 3

  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string,
  );

  // step - 4
  const email = user.email;
  const userWithoutPassword = await User.findOne(
    { email },
    {
      password: 0,
      __v: 0,
    },
  );

  return {
    userWithoutPassword,
    accessToken,
  };
};

export const UserServices = {
  registerUserIntoDB,
  logInUser,
};
