import config from '../../config';
import { Service } from '../Service/Service.Model';
import { User } from '../User/User.Model';
import { TBooking, TReqBooking } from './Booking.Interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Booking } from './Booking.Model';
import { Slot } from '../Slot/Slot.Model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

const createBookingIntoDB = async (token: string, payload: TReqBooking) => {
  /**
   * 1. Verify and Decode the JWT Access Token
   * 2. Check if the user exists in DB and put the userId as customerId in payload if it exists
   * 3. Check if the Service exists and also check if it is deleted
   * 4. Check the existence and availability of the requested slot
   * 5. Check if the requested Slot contains the requested Service
   * 6. Create booking for the User
   */

  // step - 1
  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string,
  ) as JwtPayload;

  // step - 2
  const user = await User.doesUserExists(decoded.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

  payload.customerId = user._id;

  // step - 3
  const service = await Service.findById(payload.serviceId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found !');
  }

  if (service.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The requested service is deleted',
    );
  }

  // step - 4
  const slot = await Slot.findById(payload.slotId);
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found !');
  }

  if (slot.isBooked !== 'available') {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This slot is not available at this moment',
    );
  }

  // step - 5
  if (!slot.service.equals(service._id)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Requested Slot could not found for the requested Service',
    );
  }

  // step - 6
  const {
    customerId,
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = payload;

  let bookingData: TBooking = {};

  bookingData = {
    customer: customerId,
    service: serviceId,
    slot: slotId,
    vehicleType: vehicleType,
    vehicleBrand: vehicleBrand,
    vehicleModel: vehicleModel,
    manufacturingYear: manufacturingYear,
    registrationPlate: registrationPlate,
  };

  const result = await (
    await (
      await (
        await Booking.create(bookingData)
      ).populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
    ).populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
  ).populate({
    path: 'customer',
    select: '-createdAt -updatedAt -__v',
  });

  const newResult = result.toObject();

  delete newResult.__v;

  return newResult;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
    .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
    .populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
    .select('-__v');

  return result;
};

const getUsersBookingsFromDB = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string,
  ) as JwtPayload;

  const user = await User.doesUserExists(decoded.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  const result = await Booking.find({ customer: user._id })
    .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
    .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
    .select('-customer -__v');

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUsersBookingsFromDB,
};

// const result = (
//   await (
//     await (
//       await (
//         await Booking.create(bookingData)
//       ).populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
//     ).populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
//   ).populate({ path: 'customer', select: '-createdAt -updatedAt -__v' })
// ).populate({ path: '', select: '-__v' });
