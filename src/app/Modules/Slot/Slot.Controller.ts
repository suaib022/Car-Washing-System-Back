import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { SlotServices } from './Slot.Service';
import noDataFound from '../../Utils/noDataFound';

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Slot created successfully !',
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB(req.query);

  if (result.length === 0) {
    return noDataFound(res);
  }

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Slots retrieved successfully !',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAllSlots,
};
