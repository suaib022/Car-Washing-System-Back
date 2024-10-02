import { Types } from 'mongoose';

export type TReview = {
  customer?: Types.ObjectId;
  feedback: string;
  rating: number;
  service: Types.ObjectId;
};
