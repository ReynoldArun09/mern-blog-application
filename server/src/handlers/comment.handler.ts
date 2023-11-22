import AsyncWrapper from '../helper/AsyncWrapper';
import commentModel from '../models/comment.model';
import { Request, Response } from 'express';
import postModel from '../models/post.model';

export const GetAllComment = AsyncWrapper(
  async (req: Request, res: Response) => {
    const comments = await commentModel.find({});
    return res.status(200).json({ success: true, data: comments });
  },
);

export const DeleteComment = AsyncWrapper(
  async (req: Request, res: Response) => {
    const { postId, commentId } = req.params;
    await commentModel.findByIdAndDelete(commentId);
    await postModel.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });
    return res
      .status(200)
      .json({ success: true, message: 'Comment Deleted!!' });
  },
);

export const CreateComment = AsyncWrapper(
  async (req: Request, res: Response) => {
    const { comment, postId, username, userId } = req.body;
    const comments = await commentModel.create({
      comment,
      postId,
      username,
      userId,
    });
    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: comments._id },
    });
    return res
      .status(201)
      .json({ success: true, message: 'Comment created Successfully!' });
  },
);
