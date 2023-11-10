import { Router } from 'express';
import * as commentHandler from '../handlers/comment.handler';

const router = Router();

router.get('/all/:postId', commentHandler.GetAllComment);
router.delete('/delete/:postId/:commentId', commentHandler.DeleteComment);
router.post('/create', commentHandler.CreateComment);

export default router;
