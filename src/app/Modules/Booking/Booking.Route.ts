import express from 'express';
import { BookingControllers } from './Booking.Controller';
import auth from '../../Middlewares/Auth';
import { USER_ROLE } from '../User/User.Constant';
import validateRequest from '../../Middlewares/validateRequest';
import { BookingValidations } from './Booking.Validation';

const router = express.Router();

// router.post(
//   '/',
//   auth(USER_ROLE.user),
//   validateRequest(BookingValidations.CreateBookingValidationSchema),
//   BookingControllers.createBooking,
// );

// router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.CreateBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/:slotId', BookingControllers.getSingleBooking);

router.get('/', BookingControllers.getAllBookings);

router.post('/:slotId', BookingControllers.payBooking);

router.post('/payment/confirmation', BookingControllers.confirmationController);

export const BookingRoutes = router;
