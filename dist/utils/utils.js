"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginSchema = exports.registerSchema = exports.updateBookSchema = exports.createBookSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createBookSchema = joi_1.default.object().keys({
    imageurl: joi_1.default.string().lowercase().required(),
    Title: joi_1.default.string().lowercase().required(),
    Description: joi_1.default.string().lowercase().required(),
    pageCount: joi_1.default.number().required(),
    Genre: joi_1.default.string().lowercase().required(),
    bookId: joi_1.default.string().lowercase().required(),
    Publisher: joi_1.default.string().lowercase().required(),
});
exports.updateBookSchema = joi_1.default.object().keys({
    imageurl: joi_1.default.string().lowercase().required(),
    Title: joi_1.default.string().lowercase().required(),
    Description: joi_1.default.string().lowercase().required(),
    pageCount: joi_1.default.number().required(),
    Genre: joi_1.default.string().lowercase().required(),
    bookId: joi_1.default.string().lowercase().required(),
    Publisher: joi_1.default.string().lowercase().required(),
});
exports.registerSchema = joi_1.default.object().keys({
    AuthorName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: joi_1.default.ref("password"),
    PhoneNumber: joi_1.default.string().required(),
});
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});
//Generate Token
const generateToken = (user) => {
    const pass = `${process.env.JWT_SECRET}`;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
