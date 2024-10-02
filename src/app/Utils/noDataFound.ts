import { Response } from 'express';
import sendResponse from './sendResponse';
import httpStatus from 'http-status';

const noDataFound = (res: Response) => {
  return sendResponse(res, {
    success: true,
    message: 'No Data Found',
    statusCose: httpStatus.OK,
    data: [],
  });
};

export default noDataFound;
