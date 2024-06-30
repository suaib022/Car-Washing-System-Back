import { Types } from 'mongoose';
import { TBookingStatus } from './Slot.Constant';

export type TSlot = {
  service: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked?: TBookingStatus;
};
