import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Service } from '../Service/Service.Model';
import { TSlot } from './Slot.Interface';

const createSlotIntoDB = async (payload: TSlot) => {
  const service = await Service.findById(payload.service);
  const serviceDuration = service?.duration as number;
  // console.log(serviceDuration);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service Not Found !');
  }

  const startTimeInNumber = Number(payload.startTime.split(':')[0]);
  const startTimesMinuteInNumber = Number(payload.startTime.split(':')[1]);
  const endTimeInNumber = Number(payload.endTime.split(':')[0]);
  const endTimesMinuteInNumber = Number(payload.endTime.split(':')[1]);
  if (startTimeInNumber > endTimeInNumber) {
    {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Starting time can not be greater than ending time!',
      );
    }
  }

  const totalTime =
    (endTimeInNumber - startTimeInNumber) * 60 +
    endTimesMinuteInNumber -
    startTimesMinuteInNumber;

  const totalSlots = parseInt(totalTime / serviceDuration);
  // console.log(totalSlots);
  const incrementTime = (time: string, duration: number) => {
    const hour = Number(time.split(':')[0]);
    const minute = Number(time.split(':')[1]);

    if (minute + duration < 60) {
      console.log('<');
      return `${hour}:${minute + duration}`;
    } else if (minute + duration === 60) {
      console.log('=');
      return `${hour + 1}:00`;
    } else if (minute + duration > 60) {
      console.log('>');
      const extraHour = parseInt((minute + duration) / 60);
      // console.log('exHr', extraHour);
      let extraMinute = minute + duration - 60 * extraHour;
      if (extraMinute < 10) {
        extraMinute = `0${extraMinute}`;
      }
      // console.log('min', minute);
      // console.log('dur', duration);
      // console.log('exMin', extraMinute);
      // const extraMinute = minute + duration - 60;
      return `${hour + extraHour}:${extraMinute}`;
    }
  };
  console.log(incrementTime(payload.startTime, service?.duration));
  console.log(incrementTime(payload.endTime, service?.duration));
};

export const SlotServices = {
  createSlotIntoDB,
};
