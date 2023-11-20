import { Router } from 'express';
import * as postHandler from '../handlers/post.handler';


const router = Router();

router.get('/all', postHandler.GetAllPosts);
router.post('/create', postHandler.CreatePost);
router.delete('/delete/:postId', postHandler.DeletePost)
router.get('/single/:postId', postHandler.SinglePost)
router.get("/search/:searchTerm", postHandler.SearchPost);
export default router;
