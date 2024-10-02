import mongoose, { Schema } from 'mongoose';
import { TBooking } from './Booking.Interface';
import { VehicleTypes } from './Booking.Constant';

const BookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Slot',
    },
    vehicleType: {
      type: String,
      enum: {
        values: VehicleTypes,
        message: `Vehicle types must be one of ${VehicleTypes}`,
      },
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
    },
    due: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model<TBooking>('Booking', BookingSchema);
