import { z } from 'zod';

const CreateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string !',
      required_error: 'Name is required !',
    }),
    category: z.string({
      invalid_type_error: 'Category must be a string !',
      required_error: 'Category is required !',
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
    image: z.string({
      invalid_type_error: 'Image must be a string !',
      required_error: 'Image is required !',
    }),
    isDeleted: z.boolean({
      invalid_type_error: 'IsDeleted must be a boolean !',
      required_error: 'IsDeleted is required !',
    }),
  }),
});

const UpdateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
    image: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ServiceValidations = {
  CreateServiceValidationSchema,
  UpdateServiceValidationSchema,
};
