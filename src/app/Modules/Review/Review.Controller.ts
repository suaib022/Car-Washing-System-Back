import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { ReviewServices } from './Review.Service';
import noDataFound from '../../Utils/noDataFound';

const addReview = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const result = await ReviewServices.addReviewIntoDB(
    token as string,
    req.body,
  );

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB(req.query);

  if (result.length === 0) {
    return noDataFound(res);
  }

  sendResponse(res, {
    success: true,
    message: 'All reviews retrieved successfully',
    statusCose: httpStatus.OK,
    data: result,
  });
});

export const ReviewControllers = {
  addReview,
  getAllReviews,
};
