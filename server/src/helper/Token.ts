import jwt from 'jsonwebtoken';

export const generateAccessToken = (
  userId: string | object | Buffer,
  username: string,
) => {
  const token = jwt.sign({ userId, username }, process.env.ACCESS_SECRET!, {
    expiresIn: '6h',
  });
  return token;
};

export const generateRefreshToken = (userId: string | object | Buffer) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_SECRET!, {
    expiresIn: '7d',
  });
  return token;
};
