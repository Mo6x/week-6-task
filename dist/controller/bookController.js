"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getBooks = exports.createBooks = void 0;
const uuid_1 = require("uuid");
const book_1 = require("../model/book");
const user_1 = require("../model/user");
const utils_1 = require("../utils/utils");
async function createBooks(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const verified = req.user;
        const validationResult = utils_1.createBookSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await book_1.BookInstance.create({
            id,
            ...req.body,
            authorsID: verified.id,
        });
        res.redirect("/api/dashboard");
        // res.status(201).json({
        //   msg: `You have successfully created a book`,
        //   record,
        // });
    }
    catch (err) {
        res.status(500).json({
            msg: "failed to create",
            route: "/create",
        });
    }
}
exports.createBooks = createBooks;
async function getBooks(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await BookInstance.findAll({where: {},limit, offset})
        const record = await book_1.BookInstance.findAll({
            where: {},
            limit,
            offset,
            include: [
                {
                    model: user_1.AuthorInstance,
                    attributes: ["id", "AuthorName", "email", "PhoneNumber"],
                    as: "Authors",
                },
            ],
        });
        res.render("index", { record }); /// permiting ejs to work
        // res.status(200).json({ record });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed to read",
            route: "/fetch all books",
        });
    }
}
exports.getBooks = getBooks;
async function getSingleBook(req, res, next) {
    try {
        const { id } = req.params;
        const record = await book_1.BookInstance.findOne({ where: { id } });
        return record;
        // return res.status(200).json({
        //   msg: "Successfully gotten user information",
        //   record,
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single todo",
            route: "/read/:id",
        });
    }
}
exports.getSingleBook = getSingleBook;
async function updateBook(req, res, next) {
    try {
        const { id } = req.params;
        const { Title, Description, pageCount, Genre, bookId, Publisher } = req.body;
        const validationResult = utils_1.updateBookSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await book_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing todo",
            });
        }
        const updatedrecord = await record.update({
            Title: Title,
            Description: Description,
            pageCount: pageCount,
            Genre: Genre,
            bookId: bookId,
            Publisher: Publisher,
        });
        res.redirect("/api/dashboard");
        // res.status(200).json({
        //   msg: "You have successfully updated your todo",
        //   updatedrecord,
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id",
        });
    }
}
exports.updateBook = updateBook;
async function deleteBook(req, res, next) {
    try {
        const { id } = req.params;
        const record = await book_1.BookInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find todo",
            });
        }
        const deletedRecord = await record.destroy();
        res.redirect("/api/dashboard");
        // return res.status(200).json({
        //   msg: "Todo deleted successfully",
        //   deletedRecord,
        // });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id",
        });
    }
}
exports.deleteBook = deleteBook;
