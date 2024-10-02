import express from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { ReviewValidations } from './Review.Validation';
import { ReviewControllers } from './Review.Controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidations.CreateReviewValidationSchema),
  ReviewControllers.addReview,
);

router.get('/', ReviewControllers.getAllReviews);

export const ReviewRoutes = router;
