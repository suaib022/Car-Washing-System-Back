import { TService } from './Service.Interface';
import { Service } from './Service.Model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  const newResult = result.toObject();
  delete newResult?.__v;

  return newResult;
};

const getAllServicesFromDB = async () => {
  const result = await Service.find().select('-__v');
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id).select('-__v');
  return result;
};

const updateServiceInDB = async (id: string, payload: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-__v');

  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  ).select('-__v');

  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
};
