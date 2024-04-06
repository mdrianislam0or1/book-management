import { Request, Response } from "express";
import { CartServices } from "./cart.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import ApplicationError from "../../errorHandler/ApplicationError";

const addToCartController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { bookItems, buyerName, contactNumber, sellingDate } = req.body || {};

    if (
      !userId ||
      !bookItems ||
      !Array.isArray(bookItems) ||
      !buyerName ||
      !contactNumber ||
      !sellingDate
    ) {
      throw new ApplicationError(
        httpStatus.BAD_REQUEST,
        "Invalid request body"
      );
    }

    await CartServices.addToCart({
      userId,
      bookItems,
      buyerName,
      contactNumber,
      sellingDate,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books added to cart successfully",
      data: null,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

const removeFromCartController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const userId = req.user?._id;

    await CartServices.removeFromCart(userId, bookId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book removed from cart successfully",
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

const updateCartItemQuantityController = async (
  req: Request,
  res: Response
) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.user?._id;

    await CartServices.updateCartItemQuantity(userId, bookId, quantity);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cart item quantity updated successfully",
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

const getCartSummaryController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const cartSummary = await CartServices.getCartSummary(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cart summary retrieved successfully",
      data: cartSummary,
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

export const CartControllers = {
  addToCartController,
  removeFromCartController,
  updateCartItemQuantityController,
  getCartSummaryController,
};
