import mongoose, { Schema } from 'mongoose';
import { TUser } from './User.Interface';
import { Role } from './User.Constant';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: Role,
        message: '{Value} must be a valid role !',
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<TUser>('User', userSchema);
