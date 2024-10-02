import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TReview } from './Review.Interface';
import { Review } from './Review.Model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { User } from '../User/User.Model';
import jwt from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { Service } from '../Service/Service.Model';

const addReviewIntoDB = async (token: string, payload: TReview) => {
  // step - 1
  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string,
  ) as JwtPayload;

  // step - 2
  const user = await User.doesUserExists(decoded.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

  payload.customer = user?._id;

  const doesServiceExist = await Service.findById(payload.service);

  if (!doesServiceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found');
  }

  const doesReviewWithSameServiceExists = await Review.findOne({
    service: payload.service,
    customer: user?._id,
  });

  if (doesReviewWithSameServiceExists) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'You already shared your experience with this service',
    );
  }

  const result = await Review.create(payload);

  return result;
};

const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
  const reviewSearchableFields = ['name'];

  const reviewQuery = new QueryBuilder(
    Review.find()
      .select('-__v')
      .populate({
        path: 'customer',
        select: '-createdAt -updatedAt -__v -role',
      })
      .populate({ path: 'service', select: '-createdAt -updatedAt -__v' }),
    query,
  )
    .search(reviewSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await reviewQuery.modelQuery;
  return result;
};

export const ReviewServices = {
  addReviewIntoDB,
  getAllReviewsFromDB,
};
