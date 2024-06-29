import express from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { ServiceValidations } from './Service.Validation';
import { ServiceControllers } from './Service.Controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidations.CreateServiceValidationSchema),
  ServiceControllers.createService,
);

router.get('/', ServiceControllers.getAllServices);

router.get('/:id', ServiceControllers.getSingleService);

export const ServiceRoutes = router;
