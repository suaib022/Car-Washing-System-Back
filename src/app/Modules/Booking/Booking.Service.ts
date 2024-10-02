import config from '../../config';
import { Service } from '../Service/Service.Model';
import { User } from '../User/User.Model';
import { TBooking, TPaymentData, TReqBooking } from './Booking.Interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Booking } from './Booking.Model';
import { Slot } from '../Slot/Slot.Model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { initiatePayment, verifyPayment } from '../../Utils/payment';
import { join } from 'path';
import { readFileSync } from 'fs';

const createBookingIntoDB = async (token: string, payload: TReqBooking) => {
  /**
   * 1. Verify and Decode the JWT Access Token
   * 2. Check if the user exists in DB and put the userId as customerId in payload if it exists
   * 3. Check if the Service exists and also check if it is deleted
   * 4. Check the existence and availability of the requested slot
   * 5. Check if the requested Slot contains the requested Service
   * 6. Update Slot booking status
   * 7. Create booking for the User
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
  await Slot.findByIdAndUpdate(payload.slotId, {
    isBooked: 'booked',
  });

  // step - 7
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
    due: service.price,
  };

  const result = await (
    await (
      await (
        await Booking.create(bookingData)
      ).populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
    ).populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
  ).populate({
    path: 'customer',
    select: '-createdAt -updatedAt -__v -role',
  });

  const newResult = result.toObject();

  delete newResult.__v;

  // const paymentSession = await initiatePayment();

  return newResult;
};

const payBookingFromDB = async (slotId: string) => {
  const doesBookingExist = await Booking.findOne({ slot: slotId });

  if (!doesBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking does not exist');
  }

  const service = await Service.findById(doesBookingExist?.service);
  const customer = await User.findById(doesBookingExist?.customer);

  // console.log({ doesBookingExist, service, customer, slot });

  const servicePart = doesBookingExist?.service.toHexString().substring(0, 3);
  const customerPart = doesBookingExist
    ?.customer!.toHexString()
    .substring(0, 3);
  const slotPart = doesBookingExist?.slot.toHexString().substring(0, 3);

  const transactionId = `TRX-${customerPart}${servicePart}${slotPart}${Date.now()}`;

  // console.log({ transactionId });

  const paymentData: TPaymentData = {
    bookingId: doesBookingExist?._id,
    transactionId,
    totalPrice: Number(service?.price),
    customerName: customer!.name,
    customerEmail: customer!.email,
    customerPhone: customer!.phone,
    customerAddress: customer!.address,
  };

  const paymentSession = await initiatePayment(paymentData);

  return paymentSession;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingSearchableFields = ['name'];

  const bookingQuery = new QueryBuilder(
    Booking.find()
      .select('-__v')
      .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
      .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
      .populate({
        path: 'customer',
        select: '-createdAt -updatedAt -__v -role',
      }),
    query,
  )
    .search(bookingSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await bookingQuery.modelQuery;
  return result;
};

const getUsersBookingsFromDB = async (
  query: Record<string, unknown>,
  token: string,
) => {
  const bookingSearchableFields = ['name'];
  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string,
  ) as JwtPayload;

  const user = await User.doesUserExists(decoded.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  const bookingQuery = new QueryBuilder(
    Booking.find({ customer: user._id })
      .select('-__v')
      .populate({ path: 'service', select: '-createdAt -updatedAt -__v' })
      .populate({ path: 'slot', select: '-createdAt -updatedAt -__v' })
      .populate({
        path: 'customer',
        select: '-createdAt -updatedAt -__v -role',
      }),
    query,
  )
    .search(bookingSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await bookingQuery.modelQuery;
  return result;
};

const getSingleBookingFromDB = async (slotId: string) => {
  const result = await Booking.findOne({ slot: slotId });

  return result;
};

const confirmationService = async (
  bookingId: string,
  transactionId: string,
  status: string,
) => {
  let result;
  const verifiedResponse = await verifyPayment(transactionId as string);
  if (verifiedResponse && verifiedResponse?.data?.pay_status === 'Successful') {
    result = await Booking.findByIdAndUpdate(bookingId, { due: 'paid' });
  }

  const successTransactionFilePath = join(
    __dirname,
    '../../../views/successTransaction.html',
  );
  const failedTransactionFilePath = join(
    __dirname,
    '../../../views/failedTransaction.html',
  );

  if (status === 'success') {
    const successTransaction = readFileSync(
      successTransactionFilePath,
      'utf-8',
    );

    return successTransaction;
  } else {
    const failedTransaction = readFileSync(failedTransactionFilePath, 'utf-8');

    return failedTransaction;
  }
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUsersBookingsFromDB,
  payBookingFromDB,
  confirmationService,
  getSingleBookingFromDB,
};
