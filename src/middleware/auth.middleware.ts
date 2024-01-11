import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";
import jwt from "jsonwebtoken";
import { JWT_SECURED_KEY } from "../env";
import prisma from "../prisma";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Bearer");

    if (!token) throw new HttpException("Access denied (Invalid token)", 401);
    const decode = await jwt.verify(
      token,
      JWT_SECURED_KEY,
      async (err, decode) => {
        if (err) throw new HttpException("Invalid Token! Token expired", 400);

        if (!decode)
          throw new HttpException("Invalid Token! Token expired", 400);

        const jwtPayload = decode as { _id: string; email: string };

        const user = await prisma.user.findUnique({
          where: {
            id: jwtPayload._id,
          },
        });

        if (!user)
          throw new HttpException("Access denied (Invalid token)", 401);
        res.locals.user = user;

        return next();
      }
    );
  } catch (err) {
    return next(err);
  }
};
