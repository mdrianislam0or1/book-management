import { Book } from "./book.interface";
import httpStatus from "http-status";
import ApplicationError from "../../errorHandler/ApplicationError";
import BookModel from "./book.model";

export type FilterOptions = {
  price?: { min?: number; max?: number };
  releaseDate?: Date;
  author?: string;
  isbn?: string;
  genre?: string;
  publisher?: string;
  series?: string;
  language?: string;
};
const addBookToInventory = async (
  bookData: Book,
  userId: string
): Promise<Book> => {
  try {
    bookData.owner = userId;

    const book = new BookModel(bookData);
    await book.save();
    return book;
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteBookFromDB = async (
  bookId: string,
  userId: string,
  userRole: string
): Promise<void> => {
  try {
    const query: any = {
      _id: bookId,
    };

    if (userRole === "user") {
      query.owner = userId;
    }

    const existingBook = await BookModel.findOne(query);

    if (!existingBook) {
      throw new ApplicationError(httpStatus.NOT_FOUND, "Book not found");
    }

    if (
      userRole === "user" &&
      existingBook.owner &&
      existingBook.owner.toString() !== userId
    ) {
      throw new ApplicationError(
        httpStatus.UNAUTHORIZED,
        "You do not have permission to delete this book"
      );
    }

    await BookModel.findByIdAndDelete(bookId);
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const bulkDeleteBooksFromDB = async (
  bookIds: string[],
  userId: string,
  userRole: string
): Promise<void> => {
  try {
    const query: any = { _id: { $in: bookIds } };

    if (userRole === "user") {
      query.owner = userId;
    }

    const deletedBooks = await BookModel.deleteMany(query);

    if (!deletedBooks || deletedBooks.deletedCount === 0) {
      throw new ApplicationError(httpStatus.NOT_FOUND, "Books not found");
    }
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateBookInDB = async (
  bookId: string,
  updatedBookData: any,
  userId: string,
  userRole: string
): Promise<void> => {
  try {
    const query: any = {
      _id: bookId,
    };

    if (userRole === "user") {
      query.owner = userId;
    }

    const existingBook = await BookModel.findOne(query);

    if (!existingBook) {
      throw new ApplicationError(httpStatus.NOT_FOUND, "Book not found");
    }

    if (
      userRole === "user" &&
      existingBook.owner &&
      existingBook.owner.toString() !== userId
    ) {
      throw new ApplicationError(
        httpStatus.UNAUTHORIZED,
        "You do not have permission to update this book"
      );
    }

    await BookModel.findByIdAndUpdate(bookId, updatedBookData, { new: true });
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllBooksFromDB = async (
  userId: string,
  userRole: string
): Promise<any[]> => {
  console.log("userId:", userId);
  console.log("userRole:", userRole);

  try {
    const query: any = {};

    if (userRole === "user") {
      query.owner = userId;
    }

    const books = await BookModel.find(query);
    return books;
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getBookById = async (bookId: string): Promise<any> => {
  try {
    const book = await BookModel.findById(bookId);
    return book;
  } catch (error: any) {
    throw new Error(`Error fetching book: ${error.message}`);
  }
};

const filterBooks = async (
  filters: any,
  userId: string,
  userRole: string
): Promise<any[]> => {
  try {
    const query: any = {};

    if (userRole === "user") {
      query.owner = userId;
    }

    if (filters.priceRange) {
      query.price = {
        $gte: filters.priceRange.min,
        $lte: filters.priceRange.max,
      };
    }
    if (filters.releaseDate) {
      query.releaseDate = {
        $gte: filters.releaseDate.startDate,
        $lte: filters.releaseDate.endDate,
      };
    }
    if (filters.author) {
      query.author = { $regex: new RegExp(filters.author, "i") };
    }
    if (filters.isbn) {
      query.isbn = { $regex: new RegExp(filters.isbn, "i") };
    }
    if (filters.genre) {
      query.genre = { $regex: new RegExp(filters.genre, "i") };
    }
    if (filters.publisher) {
      query.publisher = { $regex: new RegExp(filters.publisher, "i") };
    }
    if (filters.series) {
      query.series = { $regex: new RegExp(filters.series, "i") };
    }
    if (filters.language) {
      query.language = { $regex: new RegExp(filters.language, "i") };
    }
    if (filters.pageCount) {
      query.pageCount = { $regex: new RegExp(filters.pageCount, "i") };
    }
    if (filters.format) {
      query.format = { $regex: new RegExp(filters.format, "i") };
    }

    const books = await BookModel.find(query);
    return books;
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
export const BookServices = {
  addBookToInventory,
  deleteBookFromDB,
  updateBookInDB,
  getAllBooksFromDB,
  getBookById,
  filterBooks,
  bulkDeleteBooksFromDB,
};
