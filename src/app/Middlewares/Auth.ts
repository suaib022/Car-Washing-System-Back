import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../Modules/User/User.Constant';
import catchAsync from '../Utils/catchAsync';
import AppError from '../Errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../Modules/User/User.Model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    /**
     * 1. check if the token is sent by user
     * 2. verify token and decode it
     * 3. check the token's user's existence in DB
     * 4. check if the user is permitted for the route by it's role
     * 5. insert the decoded token into req.user from Express
     */

    // step - 1
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // step - 2
    const decoded = jwt.verify(
      token,
      config.jwt_access_token_secret as string,
    ) as JwtPayload;

    const { userEmail, role } = decoded;

    // step - 3
    const user = await User.doesUserExists(userEmail);
    console.log('object', user);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User Not Found !');
    }

    // step - 4
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    // step - 5
    req.user = decoded;
    next();
  });
};

export default auth;
