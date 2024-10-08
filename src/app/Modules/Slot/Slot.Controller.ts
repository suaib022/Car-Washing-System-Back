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
    message: 'Slots created successfully !',
    data: result,
  });
});

// const getAllAvailableSlots = catchAsync(async (req, res) => {
//   const result = await SlotServices.getAllAvailableSlotsFromDB(req.query);

//   if (result.length === 0) {
//     return noDataFound(res);
//   }

//   sendResponse(res, {
//     statusCose: httpStatus.OK,
//     success: true,
//     message: 'Available slots retrieved successfully',
//     data: result,
//   });
// });

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB(req.query);

  if (result.length === 0) {
    return noDataFound(res);
  }

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'All slots retrieved successfully',
    data: result,
  });
});

const getSingleSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.getSingleSlotFromDB(req.params.slotId);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Slot retrieved successfully',
    data: result,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.updateSlotInDB(req.params.slotId, req.body);

  sendResponse(res, {
    statusCose: httpStatus.OK,
    success: true,
    message: 'Slot updated successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  // getAllAvailableSlots,
  getAllSlots,
  updateSlot,
  getSingleSlot,
};
