import { Response } from 'express';
import sendResponse from './sendResponse';
import httpStatus from 'http-status';

const noDataFound = (res: Response) => {
  return sendResponse(res, {
    success: false,
    message: 'No Data Found',
    statusCose: httpStatus.NOT_FOUND,
    data: [],
  });
};

export default noDataFound;
