import express from "express";
import { auth } from "../middleware/auth";

const router = express.Router();

import {
  createBooks,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} from "../controller/bookController";
router.get("/", getBooks);
// router.get("/read", getBooks);
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/create", auth, createBooks);

router.get("/:id", getSingleBook);
// router.get("/read/:id", getSingleBook);
router.get("/:id/update", async (req, res, next) => {
  let record = await getSingleBook(req, res, next);
  res.render("update", { record });
});
router.post("/:id", auth, updateBook);
router.post("/delete/:id", auth, deleteBook);

export default router;
