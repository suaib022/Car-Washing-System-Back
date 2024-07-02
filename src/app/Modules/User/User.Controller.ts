import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { UserServices } from './User.Service';

const SignUpUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const logInUser = catchAsync(async (req, res) => {
  const result = await UserServices.logInUser(req.body);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: result.accessToken,
    data: result.userWithoutPassword,
  });
});

export const UserControllers = {
  SignUpUser,
  logInUser,
};
