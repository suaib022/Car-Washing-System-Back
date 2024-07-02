import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Service } from '../Service/Service.Model';
import { TSlot } from './Slot.Interface';
import { incrementTime } from './Slot.Utils';
import { Slot } from './Slot.Model';

const createSlotIntoDB = async (payload: TSlot) => {
  /**
   * 1. Check is the service exists in DB
   * 2. Check if the service is deleted
   * 3. Get the times in number
   * 4. Check if the start time is greater than end time
   * 5. Calculate the Total time by differencing between startTime and endTime
   * 6. Check if the Total time is less than Service duration
   * 7. Calculate Total Slots
   * 8. Dynamically calculate StartTime and EndTime for every slots and create them
   */

  // step - 1
  const service = await Service.findById(payload.service);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found !');
  }

  // step - 2
  if (service?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is deleted !');
  }
  // step - 3
  const startTimesHourInNumber = Number(payload.startTime.split(':')[0]);
  const startTimesMinuteInNumber = Number(payload.startTime.split(':')[1]);
  const endTimeInNumber = Number(payload.endTime.split(':')[0]);
  const endTimesMinuteInNumber = Number(payload.endTime.split(':')[1]);

  // step - 4
  if (startTimesHourInNumber > endTimeInNumber) {
    {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Starting time can not be greater than ending time!',
      );
    }
  }

  // step - 5
  const totalTime =
    (endTimeInNumber - startTimesHourInNumber) * 60 +
    endTimesMinuteInNumber -
    startTimesMinuteInNumber;

  // step - 6
  const serviceDuration = service?.duration as number;

  if (serviceDuration > totalTime) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Total time is less than Service duration !',
    );
  }

  // step - 7
  const totalSlots = Math.floor(totalTime / serviceDuration);

  // step - 8
  let i: number;
  const result: TSlot[] = [];
  let startTime = payload.startTime;
  let endTime = incrementTime(payload.startTime, service?.duration);

  for (i = 0; i < totalSlots; i++) {
    const SlotData: TSlot = {
      service: payload.service,
      date: payload.date,
      startTime: startTime,
      endTime: endTime as string,
      isBooked: payload.isBooked || 'available',
    };
    const data = new Slot(SlotData);
    const savedData = await data.save();
    result.push(savedData);
    startTime = incrementTime(startTime, service?.duration) as string;
    endTime = incrementTime(endTime as string, service?.duration);
  }
  return result;
};

const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
  const availableSlots = Slot.find({ isBooked: 'available' });

  if (query.date || query.serviceId) {
    const result = await availableSlots.find({
      $and: [{ date: query?.date }, { service: query?.serviceId }],
    });

    return result;
  }

  return availableSlots;
};
export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
};
