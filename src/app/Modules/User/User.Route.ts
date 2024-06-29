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

export const UserRoutes = router;
