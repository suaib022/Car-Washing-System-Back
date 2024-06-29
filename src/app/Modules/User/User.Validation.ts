import { z } from 'zod';
import { Role } from './User.Constant';

const UserSignUpValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string !',
      required_error: 'Name is required !',
    }),
    email: z.string({
      invalid_type_error: 'Email must be a string !',
      required_error: 'Email is required !',
    }),
    password: z.string({
      invalid_type_error: 'Password must be a string !',
      required_error: 'Password is required !',
    }),
    phone: z.string({
      invalid_type_error: 'Phone number must be a string !',
      required_error: 'Phone number is required !',
    }),
    role: z.enum([...Role] as [string, ...string[]], {
      required_error: 'Role is required !',
    }),
    address: z.string({
      invalid_type_error: 'Address must be a string !',
      required_error: 'Address is required !',
    }),
  }),
});

export const UserValidations = {
  UserSignUpValidationSchema,
};
