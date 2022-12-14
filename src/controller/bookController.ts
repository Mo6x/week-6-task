import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { BookInstance } from "../model/book";
import { AuthorInstance } from "../model/user";
import { createBookSchema, options, updateBookSchema } from "../utils/utils";

export async function createBooks(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const verified = req.user;
    const validationResult = createBookSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await BookInstance.create({
      id,
      ...req.body,
      authorsID: verified.id,
    });
    res.redirect("/api/dashboard");
    // res.status(201).json({
    //   msg: `You have successfully created a book`,
    //   record,
    // });
  } catch (err) {
    res.status(500).json({
      msg: "failed to create",
      route: "/create",
    });
  }
}

export async function getBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await BookInstance.findAll({where: {},limit, offset})
    const record = await BookInstance.findAll({
      where: {},
      limit,
      offset,

      include: [
        {
          model: AuthorInstance,
          attributes: ["id", "AuthorName", "email", "PhoneNumber"],
          as: "Authors",
        },
      ],
    });
    res.render("index", { record }); /// permiting ejs to work

    // res.status(200).json({ record });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed to read",
      route: "/fetch all books",
    });
  }
}

export async function getSingleBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await BookInstance.findOne({ where: { id } });
    return record;
    // return res.status(200).json({
    //   msg: "Successfully gotten user information",
    //   record,
    // });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single todo",
      route: "/read/:id",
    });
  }
}

export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { Title, Description, pageCount, Genre, bookId, Publisher } =
      req.body;
    const validationResult = updateBookSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await BookInstance.findOne({ where: { id } });
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
  } catch (error) {
    res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await BookInstance.findOne({ where: { id } });
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
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete/:id",
    });
  }
}
