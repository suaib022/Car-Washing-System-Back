import mongoose, { Schema } from 'mongoose';
import { TSlot } from './Slot.Interface';
import { BookingStatus } from './Slot.Constant';

const SlotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: {
        values: BookingStatus,
        message: `Status must be one of ${BookingStatus}`,
      },
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

export const Slot = mongoose.model<TSlot>('Slot', SlotSchema);
