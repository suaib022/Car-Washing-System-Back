import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TLoginUser, TUser } from './User.Interface';
import { User } from './User.Model';
import { createToken } from '../../Utils/createToken';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';

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

const updateUserFromDB = async (payload: Partial<TUser>, userId: string) => {
  const currentUser = await User.findById(userId);
  if (payload.email && !(currentUser?.email === payload.email)) {
    const user = await User.doesUserExists(payload.email);

    if (user) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'An account already exists with this email address.Please try a different email',
      );
    }
  }

  if (payload.phone && !(currentUser?.phone === payload.phone)) {
    const user = await User.findOne({ phone: payload.phone });

    if (user) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'An account already exists with this phone number.Please try a different number',
      );
    }
  }

  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  }).select('-__v');

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userSearchableFields = ['name'];

  const userQuery = new QueryBuilder(User.find().select('-__v'), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await userQuery.modelQuery;
  return result;
};

const getSingleUserFromDB = async (userEmail: string) => {
  const result = await User.findOne({ email: userEmail });

  return result;
};

export const UserServices = {
  registerUserIntoDB,
  logInUser,
  updateUserFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
