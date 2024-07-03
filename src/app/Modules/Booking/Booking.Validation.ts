import { z } from 'zod';
import { VehicleTypes } from './Booking.Constant';

const CreateBookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string({
      invalid_type_error: 'Service Id must be a string !',
      required_error: 'Service Id is required !',
    }),
    slotId: z.string({
      invalid_type_error: 'Slot Id must be a string !',
      required_error: 'Slot Id is required !',
    }),
    vehicleType: z.string(z.enum([...VehicleTypes] as [string, ...string[]])),
    vehicleBrand: z.string({
      invalid_type_error: 'Vehicle Brand must be a string !',
      required_error: 'Vehicle Brand is required !',
    }),
    vehicleModel: z.string({
      invalid_type_error: 'Vehicle Model must be a string !',
      required_error: 'Vehicle Model is required !',
    }),
    manufacturingYear: z.number({
      invalid_type_error: 'Manufacturing Year must be a number !',
      required_error: 'Manufacturing Year is required !',
    }),
    registrationPlate: z.string({
      invalid_type_error: 'Registration Plate must be a string !',
      required_error: 'Registration Plate is required !',
    }),
  }),
});

export const BookingValidations = {
  CreateBookingValidationSchema,
};
