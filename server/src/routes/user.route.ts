import { Router } from 'express';
import * as userHandler from '../handlers/user.handler';
import ValidateMiddleware from '../middleware/ValidateMiddleware';
import {
  LoginSchema,
  RegisterSchema,
} from '../utils/schemas/ValidationSchemas';

const router = Router();

router.post(
  '/register-user',
  ValidateMiddleware(RegisterSchema),
  userHandler.RegisterHandler,
);

router.post(
  '/login-user',
  ValidateMiddleware(LoginSchema),
  userHandler.LoginHandler,
);

router.get('/logout-user', userHandler.LogoutHandler);
router.put('/update-user/:id', userHandler.UpdateUser);

export default router;
