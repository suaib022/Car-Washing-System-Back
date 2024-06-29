import { z } from 'zod';

const CreateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string !',
      required_error: 'Name is required !',
    }),
    description: z.string({
      invalid_type_error: 'Description must be a string !',
      required_error: 'Description is required !',
    }),
    price: z.number({
      invalid_type_error: 'Price must be a number !',
      required_error: 'Price is required !',
    }),
    duration: z.number({
      invalid_type_error: 'Duration must be a number !',
      required_error: 'Duration is required !',
    }),
    isDeleted: z.boolean({
      invalid_type_error: 'IsDeleted must be a boolean !',
      required_error: 'IsDeleted is required !',
    }),
  }),
});

export const ServiceValidations = {
  CreateServiceValidationSchema,
};
