import { Router } from 'express';
import * as postHandler from '../handlers/post.handler';
import { upload } from '../helper/multer';

const router = Router();

router.get('/all', postHandler.GetAllPosts);
router.post('/create', upload.single('file'), postHandler.CreatePost);
router.delete('/delete/:postId', postHandler.DeletePost)
router.get('/single/:postId', postHandler.SinglePost)
router.get("/search/:searchTerm", postHandler.SearchPost);
export default router;
