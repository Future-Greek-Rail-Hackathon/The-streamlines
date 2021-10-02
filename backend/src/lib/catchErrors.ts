import { NextFunction, Request, Response, RequestHandler } from "express";

const catchAsyncErrors = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsyncErrors;
