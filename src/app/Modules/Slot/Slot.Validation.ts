import { z } from 'zod';
import { BookingStatus } from './Slot.Constant';

const timeStringSchema = (val: string) => {
  return z
    .string({
      required_error: `${val} is required !`,
    })
    .refine(
      (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
      },
      {
        message: 'Invalid time format, expected "HH:MM in 24 hours format"',
      },
    );
};

const updateTimeStringSchema = (val: string) => {
  return z
    .string()
    .refine(
      (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
      },
      {
        message: 'Invalid time format, expected "HH:MM in 24 hours format"',
      },
    )
    .optional();
};

const startTime = timeStringSchema('Start time');
const endTime = timeStringSchema('End time');

const updateStartTime = updateTimeStringSchema('Start time');
const updateEndTime = updateTimeStringSchema('End time');

const CreateSlotValidationSchema = z.object({
  body: z.object({
    service: z.string({
      invalid_type_error: 'Service Id must be a string !',
      required_error: 'Service Id is required !',
    }),
    date: z.string({
      invalid_type_error: 'Date must be a string !',
      required_error: 'Date is required !',
    }),
    startTime: startTime,
    endTime: endTime,
    isBooked: z
      .string(z.enum([...BookingStatus] as [string, ...string[]]))
      .optional(),
  }),
});

const UpdateSlotValidationSchema = z.object({
  body: z.object({
    service: z
      .string({
        invalid_type_error: 'Service Id must be a string !',
      })
      .optional(),
    date: z
      .string({
        invalid_type_error: 'Date must be a string !',
      })
      .optional(),
    startTime: updateStartTime,
    endTime: updateEndTime,
    isBooked: z
      .string(z.enum([...BookingStatus] as [string, ...string[]]))
      .optional(),
  }),
});

export const slotValidations = {
  CreateSlotValidationSchema,
  UpdateSlotValidationSchema,
};
