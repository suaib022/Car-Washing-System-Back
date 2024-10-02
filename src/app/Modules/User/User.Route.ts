import express from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { UserValidations } from './User.Validation';
import { UserControllers } from './User.Controller';

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
  validateRequest(UserValidations.UpdateUserValidationSchema),
  UserControllers.updateUser,
);

router.get('/users', UserControllers.getAllUsers);

router.get('/users/:userEmail', UserControllers.getSingleUser);

export const UserRoutes = router;
