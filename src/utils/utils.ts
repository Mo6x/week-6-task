import Joi from "joi";
import jwt from "jsonwebtoken";
export const createBookSchema = Joi.object().keys({
  imageurl: Joi.string().lowercase().required(),
  Title: Joi.string().lowercase().required(),
  Description: Joi.string().lowercase().required(),
  pageCount: Joi.number().required(),
  Genre: Joi.string().lowercase().required(),
  bookId: Joi.string().lowercase().required(),
  Publisher: Joi.string().lowercase().required(),
});

export const updateBookSchema = Joi.object().keys({
  imageurl: Joi.string().lowercase().required(),
  Title: Joi.string().lowercase().required(),
  Description: Joi.string().lowercase().required(),
  pageCount: Joi.number().required(),
  Genre: Joi.string().lowercase().required(),
  bookId: Joi.string().lowercase().required(),
  Publisher: Joi.string().lowercase().required(),
});

export const registerSchema = Joi.object().keys({
  AuthorName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  confirm_password: Joi.ref("password"),
  PhoneNumber: Joi.string().required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

//Generate Token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = `${process.env.JWT_SECRET}` as string;
  return jwt.sign(user, pass, { expiresIn: "7d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
