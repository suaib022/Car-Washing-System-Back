import { Schema, model } from 'mongoose';
import { TSlot } from './Slot.Interface';
import { BookingStatus } from './Slot.Constant';

const SlotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
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
        message: '{Value} must be a valid status !',
      },
      default: 'available',
    },
  },
  {
    timestamps: true,
  },
);

export const Student = model<TSlot>('Slot', SlotSchema);
