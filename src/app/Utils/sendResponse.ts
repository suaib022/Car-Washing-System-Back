import { NextFunction, Request, RequestHandler, Response } from 'express';

type TResponse<T> = {
  statusCose: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCose).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
