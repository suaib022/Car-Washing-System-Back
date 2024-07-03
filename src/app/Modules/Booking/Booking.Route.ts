import express from 'express';
import { BookingControllers } from './Booking.Controller';
import auth from '../../Middlewares/Auth';
import { USER_ROLE } from '../User/User.Constant';
import validateRequest from '../../Middlewares/validateRequest';
import { BookingValidations } from './Booking.Validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.CreateBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

export const BookingRoutes = router;
