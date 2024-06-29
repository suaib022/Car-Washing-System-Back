import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { ServiceServices } from './Service.Service';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServicesFromDB();

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully !',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const result = await ServiceServices.getSingleServiceFromDB(req.params.id);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully !',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const result = await ServiceServices.updateServiceInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Service has been updated',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const result = await ServiceServices.deleteServiceFromDB(req.params.id);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Service has been deleted',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
