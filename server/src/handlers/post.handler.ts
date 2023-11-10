import AsyncWrapper from '../helper/AsyncWrapper';
import commentModel from '../models/comment.model';
import postModel from '../models/post.model';
import { Request, Response } from 'express';
import path from 'path';

export const GetAllPosts = AsyncWrapper(async (req: Request, res: Response) => {
  const posts = await postModel.find({});
  return res.status(200).json({ success: true, data: posts });
});

export const CreatePost = AsyncWrapper(async (req: Request, res: Response) => {
  const { title, userId, username, desc, cats } = req.body;
  const filename = req?.file?.filename;
  const fileUrl = path.join(filename!);
  await postModel.create({
    title,
    desc,
    image: fileUrl,
    userId,
    username,
    categories:cats
  });
  return res
    .status(201)
    .json({ success: true, message: 'Post created Successfully!' });
});


export const SearchPost = AsyncWrapper(async (req: Request, res: Response) => {
  const searchRegex = new RegExp(req.params.searchTerm, "i");
  const findposts = await postModel.find({ title: { $regex: searchRegex } });
  return res.status(200).json({ success: true, data: findposts });
});

export const SinglePost = AsyncWrapper(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const post = await postModel.findById(postId);
  return res.status(200).json({ success: true, data: post });
});

export const DeletePost = AsyncWrapper(async (req: Request, res: Response) => {
  const { postId } = req.params;
  await postModel.findByIdAndDelete(postId);
  await commentModel.deleteMany({ postId: postId });
  return res.status(200).json({ success: true, message: "Post Deleted!!" });
});