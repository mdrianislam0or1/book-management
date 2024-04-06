import { Request, Response } from "express";
import { BookServices } from "./book.service";
import { createBookValidation } from "./book.validation";
import { Book } from "./book.interface";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import ApplicationError from "../../errorHandler/ApplicationError";
import { JwtPayload } from "jsonwebtoken";

const addBookToInventoryController = async (req: Request, res: Response) => {
  try {
    const bookData: Book = req.body;
    createBookValidation.parse(bookData);
    const userId = req.user?._id;

    console.log("User ID from Token:", userId);

    const book = await BookServices.addBookToInventory(bookData, userId);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Book added to inventory successfully",
      data: book,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteBookController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    await BookServices.deleteBookFromDB(bookId, userId, userRole);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const bulkDeleteBooksController = async (req: Request, res: Response) => {
  try {
    const { bookIds } = req.body;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    await BookServices.bulkDeleteBooksFromDB(bookIds, userId, userRole);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books deleted successfully",
      data: null,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateBookController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updatedBookData = req.body;

    const userId = req.user?._id;
    const userRole = req.user?.role;

    await BookServices.updateBookInDB(
      bookId,
      updatedBookData,
      userId,
      userRole
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book updated successfully",
      data: null,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
};
const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const { _id, role } = req.user as any;

    const books = await BookServices.getAllBooksFromDB(_id, role);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "List of books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
};
const getBookById = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;

  try {
    const book = await BookServices.getBookById(bookId);

    if (!book) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "Book not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    }
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
};
const filterBooksController = async (req: Request, res: Response) => {
  try {
    const filters = req.body;
    const userId = req.user?._id;
    const userRole = req.user?.role;
    const books = await BookServices.filterBooks(filters, userId, userRole);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books filtered successfully",
      data: books,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const BookControllers = {
  addBookToInventoryController,
  deleteBookController,
  updateBookController,
  getAllBooksController,
  getBookById,
  filterBooksController,
  bulkDeleteBooksController,
};
