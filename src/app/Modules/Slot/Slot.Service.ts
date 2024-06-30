import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Service } from '../Service/Service.Model';
import { TSlot } from './Slot.Interface';

const createSlotIntoDB = async (payload: TSlot) => {
  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found !');
  }
  console.log(service);
  const startTimeInNumber = Number(payload.startTime.split(':')[0]);
  const endTimeInNumber = Number(payload.endTime.split(':')[0]);
  console.log(startTimeInNumber, endTimeInNumber);
};

export const SlotServices = {
  createSlotIntoDB,
};
