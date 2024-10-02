import mongoose, { Schema } from 'mongoose';
import { TReview } from './Review.Interface';

const ReviewSchema = new Schema<TReview>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
  },
  {
    timestamps: true,
  },
);

export const Review = mongoose.model<TReview>('Review', ReviewSchema);
