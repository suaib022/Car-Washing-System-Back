import axios from 'axios';
import config from '../config';
import { TPaymentData } from '../Modules/Booking/Booking.Interface';

export const initiatePayment = async (paymentData: TPaymentData) => {
  const response = await axios.post(config.aamarpay_payment_url as string, {
    store_id: config.aamarpay_store_id as string,
    signature_key: config.aamarpay_signature_key as string,
    tran_id: paymentData.transactionId,
    success_url: `http://localhost:4000/api/bookings/payment/confirmation?bookingId=${paymentData.bookingId}&transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `http://localhost:4000/api/bookings/payment/confirmation?status=failed`,
    cancel_url: 'http://localhost:5173/',
    amount: paymentData.totalPrice,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'N/A',
    cus_phone: paymentData.customerPhone,
    type: 'json',
  });

  return response.data;
};

export const verifyPayment = async (transactionId: string) => {
  const response = await axios.get(
    config.aamarpay_payment_confirmation_url as string,
    {
      params: {
        store_id: config.aamarpay_store_id as string,
        signature_key: config.aamarpay_signature_key as string,
        type: 'json',
        request_id: transactionId,
      },
    },
  );

  return response;
};
