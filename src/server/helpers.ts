import { NextFunction, Request, Response } from 'express';

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => Promise<void>;

export function handleAsyncError(asyncFn: AsyncRequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFn(req, res, next).catch((error) => next(error));
  };
}

export class ErrorWithStatus extends Error {
  status: number;
  constructor(message: string, httpStatusCode: number) {
    super(message);
    this.name = 'ErrorWithStatus';
    this.status = httpStatusCode;
  }
}

interface SerializedError {
  name: string;
  message?: string;
  stack?: string;
  status?: number;
}

export function jsonErrorHandler(
  error: Error | ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // when you add a custom error handler, you must delegate to the default Express error handler,
  // https://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    next(error);
    return;
  }

  // TODO: If a request is made (superagent, fetch, axios, SQL, redis, stripe, ...)
  // Add logic to extract the error name, message, status and add it to the serialized error
  // AKA: handleSuperagentHTTPError(), handleAxiosHTTPError(), handleFetchHTTPError()
  // AKA: handleStripeError()

  let serializedError: SerializedError = {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
  if (error instanceof ErrorWithStatus) {
    serializedError.status = error.status;
  }
  // Log the error;
  console.log('ERROR');
  console.log(serializedError);
  // For production external apps, hide the error from the end user.
  if (process.env.NODE_ENV === 'production') {
    serializedError = { name: 'Internal Server Error' };
  }

  res.status(serializedError.status ?? 500).json(serializedError);
}
