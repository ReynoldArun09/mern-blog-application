import { Router } from 'express';
import * as commentHandler from '../handlers/comment.handler'


const router = Router();

router.get('/all', commentHandler.GetAllComment)


export default router;
