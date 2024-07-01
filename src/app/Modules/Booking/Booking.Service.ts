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
  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string,
  ) as JwtPayload;

  const user = await User.doesUserExists(decoded.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }
  payload.customerId = user._id;

  const service = await Service.findById(payload.serviceId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found !');
  }

  const slot = await Slot.findById(payload.slotId);
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found !');
  }

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

  const result = await Booking.create(bookingData);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate('slot')
    .populate('service')
    .populate('customer');

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

  console.log('user', user);
  const result = await Booking.find({ customer: user._id });

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUsersBookingsFromDB,
};
