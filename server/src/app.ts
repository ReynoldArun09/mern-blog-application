import express from 'express';
// import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// import responseTime from 'response-time'
import MongoSanitize from 'express-mongo-sanitize';

// import {metricsRouter, responseTimeHistogram, totalReqCounter } from './utils/metrics'
import userRoute from './routes/user.route';
import postRoute from './routes/post.route';
import commentRoute from './routes/comment.route';
import ErrorMiddleware from './middleware/ErrorMiddleware';

dotenv.config();
export const app = express();

//-----middleware----\\
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(MongoSanitize());

//--------Routes--------\\

// app.use(responseTime((req:Request, res:Response, time:number) => {
//     totalReqCounter.inc()
//     responseTimeHistogram.labels({
//         method: req.method,
//         route: req.url,
//         status_code: res.statusCode,
//     })
//     .observe(time)
// }))
// app.use(metricsRouter)

app.use('/api/v1/user', userRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/comment', commentRoute);

app.use(ErrorMiddleware);
