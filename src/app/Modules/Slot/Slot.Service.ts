import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Service } from '../Service/Service.Model';
import { TSlot } from './Slot.Interface';
import { incrementTime } from './Slot.Utils';
import { Slot } from './Slot.Model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSlotIntoDB = async (payload: TSlot) => {
  /**
   * 1. Check is the service exists in DB
   * 2. Check if the service is deleted
   * 3. Get the times in number
   * 4. Check if the start time is greater than end time
   * 5. Calculate the Total time by differencing between startTime and endTime
   * 6. Check if the Total time is less than Service duration
   * 7. Check if the slot is already created at that time interval
   * 8. Calculate Total Slots
   * 9. Dynamically calculate StartTime and EndTime for every slots and create them
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
  const endTimesHourInNumber = Number(payload.endTime.split(':')[0]);
  const endTimesMinuteInNumber = Number(payload.endTime.split(':')[1]);
  const startTimeInNumber = Number(
    startTimesHourInNumber * 60 + startTimesMinuteInNumber,
  );
  const endTimeInNumber = Number(
    endTimesHourInNumber * 60 + endTimesMinuteInNumber,
  );

  // step - 4
  if (startTimesHourInNumber > endTimesHourInNumber) {
    {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Starting time can not be greater than ending time!',
      );
    }
  }

  // step - 5
  const totalTime =
    (endTimesHourInNumber - startTimesHourInNumber) * 60 +
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
  const slotsWithSameDateAndSameService = (await Slot.find({
    date: payload.date,
    service: payload.service,
  })) as TSlot[];

  if (slotsWithSameDateAndSameService.length >= 0) {
    for (let i = 0; i < slotsWithSameDateAndSameService.length; i++) {
      const existedSlotsStartTimesHourInNumber = Number(
        slotsWithSameDateAndSameService[i].startTime.split(':')[0],
      );
      const existedSlotsStartTimesMinuteInNumber = Number(
        slotsWithSameDateAndSameService[i].startTime.split(':')[1],
      );
      const existedSlotsEndTimesHourInNumber = Number(
        slotsWithSameDateAndSameService[i].endTime.split(':')[0],
      );
      const existedSlotsEndTimesMinuteInNumber = Number(
        slotsWithSameDateAndSameService[i].endTime.split(':')[1],
      );
      const existedSlotsStartTimeInNumber = Number(
        existedSlotsStartTimesHourInNumber * 60 +
          existedSlotsStartTimesMinuteInNumber,
      );
      const existedSlotsEndTimeInNumber = Number(
        existedSlotsEndTimesHourInNumber * 60 +
          existedSlotsEndTimesMinuteInNumber,
      );

      if (
        endTimeInNumber > existedSlotsStartTimeInNumber &&
        startTimeInNumber < existedSlotsEndTimeInNumber
      ) {
        throw new AppError(
          httpStatus.NOT_ACCEPTABLE,
          `Slot at that time range on ${payload.date} is already created.Please try different time range`,
        );
      }
    }
  }

  // step - 8
  const totalSlots = Math.floor(totalTime / serviceDuration);

  // step - 9
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
  const newResult = result.map((slot) => slot.toObject());
  newResult.forEach((slot) => delete slot.__v);

  return newResult;
};

const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
  const slotSearchableFields = ['service', 'date'];

  const slotQuery = new QueryBuilder(
    Slot.find().populate({ path: 'service', select: '-__v' }).select('-__v'),
    query,
  )
    .search(slotSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await slotQuery.modelQuery;
  return result;
};

const getSingleSlotFromDB = async (slotId: string) => {
  const result = await Slot.findById(slotId)
    .populate({ path: 'service', select: '-__v' })
    .select('-__v');

  return result;
};

const updateSlotInDB = async (id: string, payload: Partial<TSlot>) => {
  const result = await Slot.findByIdAndUpdate(id, payload, {
    new: true,
  }).select('-__v');

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
  updateSlotInDB,
  getSingleSlotFromDB,
};
