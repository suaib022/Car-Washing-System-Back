import { TCategories } from './Service.Constants';

export type TService = {
  name: string;
  category: TCategories;
  description: string;
  price: number;
  duration: number;
  image: string;
  isDeleted: boolean;
};
