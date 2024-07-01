export const VEHICLE_TYPES = {
  car: 'car',
  truck: 'truck',
  SUV: 'SUV',
  van: 'van',
  motorcycle: 'motorcycle',
  bus: 'bus',
  electricVehicle: 'electricVehicle',
  hybridVehicle: 'hybridVehicle',
  bicycle: 'bicycle',
  tractor: 'tractor',
};

export type TVehicleTypes = keyof typeof VEHICLE_TYPES;

export const VehicleTypes: TVehicleTypes[] = [
  'car',
  'truck',
  'SUV',
  'van',
  'motorcycle',
  'bus',
  'electricVehicle',
  'hybridVehicle',
  'bicycle',
  'tractor',
];
