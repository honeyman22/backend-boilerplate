import { NextFunction, Request, Response } from "express";

const asyncHandler = (controller: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      console.log(error, "tfuyrewqfueyyf");
      return next(error);
    }
  };
};

export default asyncHandler;
