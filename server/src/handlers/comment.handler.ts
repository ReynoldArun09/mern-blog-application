import AsyncWrapper from '../helper/AsyncWrapper';
import commentModel from '../models/comment.model';
import { Request, Response } from 'express';

export const GetAllComment = AsyncWrapper(
  async (req: Request, res: Response) => {
    const comments = await commentModel.find({});
    return res.status(200).json({ success: true, data: comments });
  },
);
