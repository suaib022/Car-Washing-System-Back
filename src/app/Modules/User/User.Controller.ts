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

const updateUser = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserFromDB(
    req.body,
    req.params.userId,
  );

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserServices.getSingleUserFromDB(req.params.userEmail);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  SignUpUser,
  logInUser,
  updateUser,
  getAllUsers,
  getSingleUser,
};
