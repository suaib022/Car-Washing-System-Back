import express from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { UserValidations } from './User.Validation';
import { UserControllers } from './User.Controller';
import { USER_ROLE } from './User.Constant';
import auth from '../../Middlewares/Auth';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.UserSignUpValidationSchema),
  UserControllers.SignUpUser,
);

router.post(
  '/login',
  validateRequest(UserValidations.LoginValidationSchema),
  UserControllers.logInUser,
);

router.put(
  '/updateUser/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidations.UpdateUserValidationSchema),
  UserControllers.updateUser,
);

router.get('/users', auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.get(
  '/users/:userEmail',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getSingleUser,
);

export const UserRoutes = router;
