import { Router } from 'express';
import * as postHandler from '../handlers/post.handler';

const router = Router();

router.get('/all', postHandler.GetAllPosts);

export default router;
