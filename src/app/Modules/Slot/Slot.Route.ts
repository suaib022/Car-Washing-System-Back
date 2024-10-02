import express from 'express';
import { SlotControllers } from './Slot.Controller';
import { slotValidations } from './Slot.Validation';
import validateRequest from '../../Middlewares/validateRequest';
import auth from '../../Middlewares/Auth';
import { USER_ROLE } from '../User/User.Constant';

const router = express.Router();

// router.post(
//   '/',
//   auth(USER_ROLE.admin),
//   validateRequest(slotValidations.CreateSlotValidationSchema),
//   SlotControllers.createSlot,
// );

router.post(
  '/',
  validateRequest(slotValidations.CreateSlotValidationSchema),
  SlotControllers.createSlot,
);

router.get('/:slotId', SlotControllers.getSingleSlot);

router.get('/', SlotControllers.getAllSlots);

router.put(
  '/:slotId',
  validateRequest(slotValidations.UpdateSlotValidationSchema),
  SlotControllers.updateSlot,
);

export const SlotRoutes = router;
