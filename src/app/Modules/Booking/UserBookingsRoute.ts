import express from 'express';
import { BookingControllers } from './Booking.Controller';
import auth from '../../Middlewares/Auth';
import { USER_ROLE } from '../User/User.Constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.user), BookingControllers.getUsersBookings);

export const UserBookingRoutes = router;
