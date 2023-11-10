import AsyncWrapper from "../helper/AsyncWrapper";
import postModel from "../models/post.model";
import { Request, Response } from 'express';

export const GetAllPosts = AsyncWrapper(
  async (req: Request, res: Response) => {
    const posts = await postModel.find({});
    return res.status(200).json({ success: true, data: posts });
  },
);
