import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { BookingServices } from './Booking.Service';
import noDataFound from '../../Utils/noDataFound';
import { Response, Request } from 'express';

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

const payBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.payBookingFromDB(req.params.slotId);

  sendResponse(res, {
    success: true,
    message: 'Payment Successful',
    statusCose: httpStatus.OK,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB(req.query);

  if (result.length === 0) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    message: 'All bookings retrieved successfully',
    statusCose: httpStatus.OK,
    data: result,
  });
});

const getUsersBookings = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const result = await BookingServices.getUsersBookingsFromDB(
    req.query,
    token as string,
  );

  if (result.length === 0) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    message: 'User bookings retrieved successfully',
    statusCose: httpStatus.OK,
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getSingleBookingFromDB(
    req.params.slotId,
  );

  sendResponse(res, {
    success: true,
    message: 'Booking retrieved successfully',
    statusCose: httpStatus.OK,
    data: result,
  });
});

const confirmationController = async (req: Request, res: Response) => {
  const { bookingId, transactionId, status } = req.query;
  const result = await BookingServices.confirmationService(
    bookingId as string,
    transactionId as string,
    status as string,
  );
  res.send(result);
};

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUsersBookings,
  payBooking,
  confirmationController,
  getSingleBooking,
};
