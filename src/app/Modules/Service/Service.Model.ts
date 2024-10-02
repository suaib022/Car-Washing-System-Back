import mongoose, { Schema } from 'mongoose';
import { TService } from './Service.Interface';
import { categories } from './Service.Constants';

export const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: categories,
        message: `Category must be one of ${categories}`,
      },
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Service = mongoose.model<TService>('Service', serviceSchema);
