import z from 'zod';

const CreateReviewValidationSchema = z.object({
  body: z.object({
    feedback: z.string({
      invalid_type_error: 'Feedback must be a string !',
      required_error: 'Feedback is required !',
    }),
    rating: z.number({
      invalid_type_error: 'Rating must be a number',
      required_error: 'Rating is required',
    }),
    service: z.string({
      invalid_type_error: 'Service ID must be a string',
      required_error: 'Service ID is required',
    }),
  }),
});

export const ReviewValidations = {
  CreateReviewValidationSchema,
};
