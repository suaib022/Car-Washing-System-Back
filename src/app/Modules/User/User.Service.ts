import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TLoginUser, TUser } from './User.Interface';
import { User } from './User.Model';
import { createToken } from '../../Utils/createToken';
import config from '../../config';

const registerUserIntoDB = async (payload: TUser) => {
  console.log('object');
  const result = await User.create(payload);
  return result;
};

const logInUser = async (payload: TLoginUser) => {
  // user check in DB
  const user = await User.doesUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
  }

  // check password
  if (!(await User.doesPasswordMatch(payload.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match !');
  }

  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string,
  );

  const email = user.email;
  const userWithoutPassword = await User.findOne(
    { email },
    {
      name: 1,
      email: 1,
      phone: 1,
      role: 1,
      address: 1,
      createdAt: 1,
      updatedAt: 1,
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
