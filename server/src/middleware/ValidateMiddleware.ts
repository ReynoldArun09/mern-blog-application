import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const ValidateMiddleware =
  (Schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export default ValidateMiddleware;
