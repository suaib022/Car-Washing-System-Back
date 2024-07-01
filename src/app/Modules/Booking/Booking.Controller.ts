import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { BookingServices } from './Booking.Service';

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const result = await BookingServices.createBookingIntoDB(
    token as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    message: 'Booking successful',
    statusCose: httpStatus.OK,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    success: true,
    message: 'All bookings retrieved successfully',
    statusCose: httpStatus.OK,
    data: result,
  });
});

const getUsersBookings = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const result = await BookingServices.getUsersBookingsFromDB(token as string);

  sendResponse(res, {
    success: true,
    message: 'All bookings retrieved successfully',
    statusCose: httpStatus.OK,
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUsersBookings,
};
