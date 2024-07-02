import { TErrorSources, TGenericErrorResponse } from '../Interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} already exists !`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Already exists',
    errorSources,
  };
};

export default handleDuplicateError;
