import { NextFunction, Request, Response } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function handleAsyncError(asyncFn: AsyncRequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFn(req, res, next).catch((error) => next(error));
  };
}
