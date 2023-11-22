import AsyncWrapper from '../helper/AsyncWrapper';
import { Request, Response } from 'express';
import userModel from '../models/user.model';
import AppError from '../helper/AppError';
import { HttpStatusCode, MESSAGES } from '../helper/enum';
import { generateAccessToken, generateRefreshToken } from '../helper/Token';

//regiser user
export const RegisterHandler = AsyncWrapper(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      throw new AppError(
        MESSAGES.USER_ALREADY_EXIST,
        HttpStatusCode.BAD_REQUEST,
      );
    }
    await userModel.create({
      email,
      username,
      password,
    });

    return res
      .status(HttpStatusCode.CREATED)
      .json({ success: true, message: MESSAGES.USER_REGISTER_SUCCESS });
  },
);
//login user
export const LoginHandler = AsyncWrapper(
  async (req: Request, res: Response) => {
    const { email, password: pass } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      throw new AppError(MESSAGES.INCORRECT_EMAIL, HttpStatusCode.BAD_REQUEST);
    }
    const compare = await findUser?.ComparePassword(pass);
    if (!compare) {
      throw new AppError(
        MESSAGES.INCORRECT_PASSWORD,
        HttpStatusCode.BAD_REQUEST,
      );
    }
    const accessToken = generateAccessToken(findUser._id, findUser.username);
    const refreshToken = generateRefreshToken(findUser._id);
    res.cookie('refreshToken', refreshToken);
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.USER_LOGIN_SUCCESS,
      data: {
        token: accessToken,
        username: findUser.username,
        userId: findUser._id,
        avatar: findUser.avatar,
      },
    });
  },
);

//logout user
export const LogoutHandler = AsyncWrapper(
  async (req: Request, res: Response) => {
    res
      .clearCookie('refreshToken', { sameSite: 'none', secure: true })
      .status(200)
      .json({
        success: true,
        message: MESSAGES.USER_LOGOUT,
      });
  },
);

export const UpdateUser = AsyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, avatar } = req.body;
  console.log(username, avatar);
  await userModel.findByIdAndUpdate(
    { _id: id },
    {
      username: username,
      avatar: avatar,
    },
  );
  res.status(201).json({ success: true, message: MESSAGES.USER_UPDATE });
});
