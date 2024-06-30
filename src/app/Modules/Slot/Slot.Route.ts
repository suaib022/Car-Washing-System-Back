import express from 'express';
import { SlotControllers } from './Slot.Controller';
import { slotValidations } from './Slot.Validation';
import validateRequest from '../../Middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(slotValidations.CreateSlotValidationSchema),
  SlotControllers.createSlot,
);

export const SlotRoutes = router;
