import { Router } from 'express';
import * as userHandler from '../handlers/user.handler';
import ValidateMiddleware from '../middleware/ValidateMiddleware';
import { RegisterSchema } from '../utils/schemas/ValidationSchemas';

const router = Router();

router.post(
  '/register-user',
  ValidateMiddleware(RegisterSchema),
  userHandler.RegisterHandler,
);

export default router;
