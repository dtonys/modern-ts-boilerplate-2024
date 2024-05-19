import { NextFunction, Request, Response } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function handleAsyncError(asyncFn: AsyncRequestHandler) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await asyncFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
