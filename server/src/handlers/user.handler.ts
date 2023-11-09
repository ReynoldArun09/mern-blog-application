import AsyncWrapper from '../helper/AsyncWrapper';
import { Request, Response } from 'express';
import userModel from '../models/user.model';
import AppError from '../helper/AppError';
import { HttpStatusCode } from '../helper/enum';

export const RegisterHandler = AsyncWrapper(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const findUser = await userModel.findOne({ email });

    if (findUser) {
      return new AppError(
        'Username/Email is already in use.',
        HttpStatusCode.BAD_REQUEST,
      );
    } 

    const CreateUser = await userModel.create({
      username,
      email,
      password,
    });

    if (CreateUser) {
      return res.status(201).json({ success: true });
    } else {
      return new AppError(
        'Something went wrong while register user.',
        HttpStatusCode.INTERNAL_SERVER,
      );
    }
  },
);
