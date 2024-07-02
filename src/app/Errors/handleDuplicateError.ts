import { TErrorSources, TGenericErrorResponse } from '../Interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorMessages: TErrorSources = [
    {
      path: '',
      message: err?.errorResponse?.errmsg,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: err?.errorResponse?.errmsg,
    errorMessages,
  };
};

export default handleDuplicateError;
