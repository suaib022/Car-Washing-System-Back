import express from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { ServiceValidations } from './Service.Validation';
import { ServiceControllers } from './Service.Controller';
import auth from '../../Middlewares/Auth';
import { USER_ROLE } from '../User/User.Constant';

const router = express.Router();

// router.post(
//   '/',
//   auth(USER_ROLE.admin),
//   validateRequest(ServiceValidations.CreateServiceValidationSchema),
//   ServiceControllers.createService,
// );

router.post(
  '/',
  validateRequest(ServiceValidations.CreateServiceValidationSchema),
  ServiceControllers.createService,
);

router.get('/', ServiceControllers.getAllServices);

router.get('/:id', ServiceControllers.getSingleService);

// router.put(
//   '/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(ServiceValidations.UpdateServiceValidationSchema),
//   ServiceControllers.updateService,
// );

// router.patch('/:id', auth(USER_ROLE.admin), ServiceControllers.deleteService);

router.put(
  '/:id',
  validateRequest(ServiceValidations.UpdateServiceValidationSchema),
  ServiceControllers.updateService,
);

router.patch('/:id', ServiceControllers.softDeleteService);

router.delete('/:id', ServiceControllers.permanentDeleteService);

export const ServiceRoutes = router;
