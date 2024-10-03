import express from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { ReviewValidations } from './Review.Validation';
import { ReviewControllers } from './Review.Controller';
import auth from '../../Middlewares/Auth';
import { USER_ROLE } from '../User/User.Constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidations.CreateReviewValidationSchema),
  ReviewControllers.addReview,
);

router.get('/', ReviewControllers.getAllReviews);

export const ReviewRoutes = router;
