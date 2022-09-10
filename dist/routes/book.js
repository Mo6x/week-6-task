"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const bookController_1 = require("../controller/bookController");
router.get("/", bookController_1.getBooks);
// router.get("/read", getBooks);
router.get("/new", (req, res) => {
    res.render("new");
});
router.post("/create", auth_1.auth, bookController_1.createBooks);
router.get("/:id", bookController_1.getSingleBook);
// router.get("/read/:id", getSingleBook);
router.get("/:id/update", async (req, res, next) => {
    let record = await (0, bookController_1.getSingleBook)(req, res, next);
    res.render("update", { record });
});
router.post("/:id", auth_1.auth, bookController_1.updateBook);
router.post("/delete/:id", auth_1.auth, bookController_1.deleteBook);
exports.default = router;
