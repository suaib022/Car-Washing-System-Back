import mongoose, { Schema, model } from 'mongoose';
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
    vehicleType: {
      type: String,
      enum: {
        values: VehicleTypes,
        message: '{Value} must be a valid vehicle !',
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model<TBooking>('Booking', BookingSchema);
