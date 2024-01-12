import { Request, Response } from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler";
import prisma from "../prisma";
import HttpException from "../utils/HttpException";
import {
  UserLoginSchemaInputType,
  UserRegistrationInputType,
} from "../validators/auth.validator";
import { JWT_SECURED_KEY } from "../env";
import { pagedocs, pagination } from "../utils/pagination";

const register = asyncHandler(
  async (req: Request<UserRegistrationInputType>, res: Response) => {
    const { name, country, dateofbirth, email, gender, password } = req.body;

    const validEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (validEmail) throw new HttpException("Email already exists", 400);

    const encryptedpassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        password: encryptedpassword,
        email,
        gender,
        dateofbirth,
        country,
      },
    });

    const token = jwt.sign(
      { _id: user.id, _email: user.email },
      JWT_SECURED_KEY,
      { expiresIn: "2h" }
    );

    const updateduser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
        token,
      },
    });

    return res.status(201).json({
      status: true,
      message: "User created sucessfully",
      data: {
        id: user?.id,
        dateofbirth,
        name,
        gender,
        email,
        country,
      },
    });
  }
);

const login = asyncHandler(
  async (req: Request<UserLoginSchemaInputType>, res: Response) => {
    const { email, password } = req.body;

    const validuser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!validuser) throw new HttpException("Email doesnot exists", 400);

    const verifypassword = await bcrypt.compare(
      req.body.password,
      validuser.password
    );

    if (!verifypassword) throw new HttpException("Invalid Credentials", 400);

    const token = jwt.sign(
      { _id: validuser.id, _email: validuser.email },
      JWT_SECURED_KEY,
      { expiresIn: "2h" }
    );

    const updateduser = await prisma.user.update({
      where: { id: validuser.id },
      data: {
        ...validuser,
        token,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Loged in successfully",
      data: {
        name: validuser.name,
        email: validuser.email,
        token,
      },
    });
  }
);

const getalluser = asyncHandler(async (req: Request, res: Response) => {
  const reqquery = req.query;
  const { page, limit, skip } = pagination(reqquery);

  const reqFilter = req.query.filter as string;

  const filter = reqFilter ? reqFilter : undefined;

  const [users, count] = await Promise.all([
    prisma.user.findMany({
      where: {
        name: {
          contains: filter,
          mode: "insensitive",
        },
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        gender: true,
        dateofbirth: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  const docs = pagedocs({ count, limit, page });

  return res.status(200).json({
    data: users,
    pagination: docs,
  });
});

const AuthController = { register, login, getalluser };

export default AuthController;
