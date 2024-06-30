export const BOOKING_STATUS = {
  available: 'available',
  booked: 'booked',
  canceled: 'canceled',
};

export type TBookingStatus = keyof typeof BOOKING_STATUS;

export const BookingStatus: TBookingStatus[] = [
  'available',
  'booked',
  'canceled',
];
