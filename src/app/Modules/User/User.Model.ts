/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose';
import { TUser } from './User.Interface';
import { Role } from './User.Constant';
import bcrypt from 'bcrypt';
import config from '../../config';

export const userSchema = new Schema<TUser>(
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
      select: 0,
    },
    image: {
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
        message: `Role must be one of ${Role}`,
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

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  userSchema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    },
  });

  next();
});

userSchema.statics.doesUserExists = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.doesPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = mongoose.model<TUser>('User', userSchema);
