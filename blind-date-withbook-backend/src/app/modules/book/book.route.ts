import express from "express";
import { BookControllers } from "./book.controller";
import validateRequest from "../../middleware/validateRequest";
import { createBookValidation, updateBookValidation } from "./book.validation";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/add",
  auth("user", "manager", "superAdmin"),
  validateRequest(createBookValidation),
  BookControllers.addBookToInventoryController
);

router.delete("/:bookId", auth(), BookControllers.deleteBookController);

router.delete(
  "/",
  auth("user", "manager", "superAdmin"),
  BookControllers.bulkDeleteBooksController
);

router.put(
  "/:bookId",
  auth(),
  validateRequest(updateBookValidation),
  BookControllers.updateBookController
);

router.get("/", auth(), BookControllers.getAllBooksController);

router.get(
  "/:bookId",
  auth("user", "manager", "superAdmin"),
  BookControllers.getBookById
);

router.post("/filter", auth(), BookControllers.filterBooksController);

export const BookRouters = router;
