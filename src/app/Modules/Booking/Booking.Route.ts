import express from 'express';
import { BookingControllers } from './Booking.Controller';

const router = express.Router();

router.post('/', BookingControllers.createBooking);

router.get('/', BookingControllers.getAllBookings);

router.get('/my-bookings', BookingControllers.getUsersBookings);

export const BookingRoutes = router;
