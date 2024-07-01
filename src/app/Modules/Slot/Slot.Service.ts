import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Service } from '../Service/Service.Model';
import { TSlot } from './Slot.Interface';
import { incrementTime } from './Slot.Utils';
import { Slot } from './Slot.Model';

const createSlotIntoDB = async (payload: TSlot) => {
  const service = await Service.findById(payload.service);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found !');
  }

  const startTimesHourInNumber = Number(payload.startTime.split(':')[0]);
  const startTimesMinuteInNumber = Number(payload.startTime.split(':')[1]);
  const endTimeInNumber = Number(payload.endTime.split(':')[0]);
  const endTimesMinuteInNumber = Number(payload.endTime.split(':')[1]);
  if (startTimesHourInNumber > endTimeInNumber) {
    {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Starting time can not be greater than ending time!',
      );
    }
  }

  const totalTime =
    (endTimeInNumber - startTimesHourInNumber) * 60 +
    endTimesMinuteInNumber -
    startTimesMinuteInNumber;

  const serviceDuration = service?.duration as number;
  // console.log('totalTime', totalTime);
  // console.log('serviceDuration', serviceDuration);

  if (serviceDuration > totalTime) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Total time is less than Service duration !',
    );
  }

  const totalSlots = Math.floor(totalTime / serviceDuration);

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
    };
    const data = new Slot(SlotData);
    const savedData = await data.save();
    result.push(savedData);
    startTime = incrementTime(startTime, service?.duration) as string;
    endTime = incrementTime(endTime as string, service?.duration);
  }
  // console.log('totalSlots', totalSlots);

  // console.log(incrementTime(payload.startTime, service?.duration));
  // console.log(incrementTime(payload.endTime, service?.duration));
  // console.log('---------------');
  console.log('res:', result);
};

export const SlotServices = {
  createSlotIntoDB,
};
