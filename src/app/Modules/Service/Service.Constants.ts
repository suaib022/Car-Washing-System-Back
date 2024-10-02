export const CATEGORIES = {
  ExteriorWash: 'Exterior Wash',
  InteriorCleaning: 'Interior Cleaning',
  FullDetailing: 'Full Detailing',
  ExpressWash: 'Express Wash',
  EngineCleaning: 'Engine Cleaning',
  WaxingPolishing: 'Waxing & Polishing',
  Vacuuming: 'Vacuuming',
  CeramicCoating: 'Ceramic Coating',
  PaintProtection: 'Paint Protection',
  WindowCleaning: 'Window Cleaning',
  SUVTruckWash: 'SUV/Truck Wash',
  LuxuryVehicleDetailing: 'Luxury Vehicle Detailing',
};

export type TCategories = keyof typeof CATEGORIES;

export const categories: TCategories[] = [
  'ExteriorWash',
  'InteriorCleaning',
  'FullDetailing',
  'ExpressWash',
  'EngineCleaning',
  'WaxingPolishing',
  'Vacuuming',
  'CeramicCoating',
  'PaintProtection',
  'WindowCleaning',
  'SUVTruckWash',
  'LuxuryVehicleDetailing',
];
