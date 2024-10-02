import { Types } from 'mongoose';
import { TVehicleTypes } from './Booking.Constant';

export type TBooking = {
  customer?: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: TVehicleTypes;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  due: string | number;
};

export type TReqBooking = {
  customerId?: Types.ObjectId;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  vehicleType: TVehicleTypes;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  due: string | number;
};

export type TPaymentData = {
  bookingId: Types.ObjectId;
  transactionId: string;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
};
