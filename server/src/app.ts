import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import responseTime from 'response-time'

import  {metricsRouter, responseTimeHistogram, totalReqCounter } from './utils/metrics'

dotenv.config() 
export const app = express()

//-----middleware----\\
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

//--------Routes--------\\
app.use(responseTime((req:Request, res:Response, time:number) => {
    totalReqCounter.inc()
    responseTimeHistogram.labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
    })
    .observe(time)
}))
app.use(metricsRouter)