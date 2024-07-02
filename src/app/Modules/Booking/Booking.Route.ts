import express from 'express';
import { BookingControllers } from './Booking.Controller';
import auth from '../../Middlewares/Auth';
import { USER_ROLE } from '../User/User.Constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), BookingControllers.createBooking);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingControllers.getUsersBookings,
);

export const BookingRoutes = router;
