import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  registerSchema,
  options,
  loginSchema,
  generateToken,
} from "../utils/utils";
import { AuthorInstance } from "../model/user";
import bcrypt from "bcryptjs";
import { BookInstance } from "../model/book";

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = registerSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const duplicatEmail = await AuthorInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicatEmail) {
      return res.status(409).json({
        msg: "Email is used, please change email",
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const record = await AuthorInstance.create({
      id: id,
      AuthorName: req.body.AuthorName,
      email: req.body.email,
      password: passwordHash,
      PhoneNumber: req.body.PhoneNumber,
    });
    res.redirect("/api/login");
    // res.status(201).json({
    //   msg: "You have successfully created a user",
    //   record,
    // });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "failed to register",
      route: "/register",
    });
  }
}

export async function LoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = loginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const User = (await AuthorInstance.findOne({
      where: { email: req.body.email },
      include: [{ model: BookInstance, as: "Books" }],
    })) as unknown as { [key: string]: string };

    const { id } = User;
    const token = generateToken({ id });
    const validUser = await bcrypt.compare(req.body.password, User.password);

    if (!validUser) {
      res.status(401).json({
        message: "Password do not match",
      });
    }

    if (validUser) {
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.cookie("id", id, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.redirect("/api/dashboard");
      // res.status(200).json({
      //   message: "Successfully logged in",
      //   token,
      //   User,
      // });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "failed to login",
      route: "/login",
    });
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await BookInstance.findAll({where: {},limit, offset})
    const record = await AuthorInstance.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: BookInstance,
          as: "Books",
        },
      ],
    });
    res.status(200).json({
      msg: "You have successfully fetch all books",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function getSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let id = req.cookies.id;
  try {
    const record = await AuthorInstance.findOne({
      where: { id },
      include: [
        {
          model: BookInstance,
          as: "Books",
        },
      ],
    });
    res.render("dashboard", { record });
  } catch (error) {
    res.status(200).json({
      msg: "failed to read",
      route: "./read",
    });
  }
}
