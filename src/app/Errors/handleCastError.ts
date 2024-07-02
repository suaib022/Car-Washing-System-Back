import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../Interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessages: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Id',
    errorMessages,
  };
};

export default handleCastError;
