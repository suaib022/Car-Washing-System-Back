import { Response } from 'express';

export type TResponse<T> = {
  success: boolean;
  statusCose: number;
  message?: string;
  token?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCose).json({
    success: data.success,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};

export default sendResponse;
