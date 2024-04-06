import { Types } from "mongoose";
import { AddToCartData, Cart, CartItem } from "./cart.interface";
import CartModel from "./cart.model";
import httpStatus from "http-status";
import ApplicationError from "../../errorHandler/ApplicationError";
import BookModel from "../book/book.model";
import { Book } from "../book/book.interface";

const addToCart = async ({
  userId,
  bookItems,
  buyerName,
  contactNumber,
  sellingDate,
}: AddToCartData): Promise<void> => {
  try {
    if (!Array.isArray(bookItems)) {
      throw new ApplicationError(
        httpStatus.BAD_REQUEST,
        "bookItems is not an array"
      );
    }

    const existingCart = await CartModel.findOne({ user: userId });

    if (!existingCart) {
      const newCartData = {
        user: userId,
        items: [] as CartItem[],
        totalAmount: 0,
        buyerName,
        contactNumber,
        sellingDate,
      };

      for (const { bookId, quantity } of bookItems) {
        const book = await BookModel.findById(bookId);

        if (!book) {
          throw new ApplicationError(httpStatus.NOT_FOUND, "Book not found");
        }

        if (book.quantity < quantity) {
          throw new ApplicationError(
            httpStatus.BAD_REQUEST,
            "Insufficient quantity in inventory"
          );
        }

        const newCartItem: CartItem = {
          book: bookId,
          quantity,
        };

        newCartData.items.push(newCartItem);

        newCartData.totalAmount += quantity * (book?.price || 0);

        book.quantity -= quantity;

        if (book.quantity === 0) {
          await BookModel.findByIdAndDelete(bookId);
        } else {
          await book.save();
        }
      }

      await CartModel.create(newCartData);
    } else {
      for (const { bookId, quantity } of bookItems) {
        const book = await BookModel.findById(bookId);

        if (!book) {
          throw new ApplicationError(httpStatus.NOT_FOUND, "Book not found");
        }

        if (book.quantity < quantity) {
          throw new ApplicationError(
            httpStatus.BAD_REQUEST,
            "Insufficient quantity in inventory"
          );
        }

        const cartItemIndex = existingCart.items.findIndex(
          (item) => item.book.toString() === bookId.toString()
        );

        if (cartItemIndex !== -1) {
          existingCart.items[cartItemIndex].quantity += quantity;
        } else {
          const newCartItem: CartItem = {
            book: bookId,
            quantity,
          };
          existingCart.items.push(newCartItem);
        }

        existingCart.totalAmount += quantity * (book?.price || 0);

        book.quantity -= quantity;

        if (book.quantity === 0) {
          await BookModel.findByIdAndDelete(bookId);
        } else {
          await book.save();
        }
      }

      await existingCart.save();
    }
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateCartItemQuantity = async (
  userId: Types.ObjectId,
  bookId: string,
  quantity: number
): Promise<void> => {
  try {
    const existingCart = await CartModel.findOne({ user: userId }).populate(
      "items.book"
    );

    if (!existingCart) {
      throw new ApplicationError(httpStatus.NOT_FOUND, "Cart not found");
    }

    const cartItem = existingCart.items.find((item: CartItem) => {
      if (typeof item.book === "string") {
        return false;
      } else {
        return item.book?._id.toString() === bookId;
      }
    });

    console.log("existingCart:", existingCart);
    console.log("cartItem:", cartItem);

    if (cartItem) {
      if (typeof cartItem.book === "string") {
        throw new ApplicationError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Unexpected type for book"
        );
      }

      const book: Book = cartItem.book as unknown as Book;

      if (!book) {
        throw new ApplicationError(httpStatus.NOT_FOUND, "Book not found");
      }

      const previousQuantity = cartItem.quantity;
      const quantityDifference = quantity - previousQuantity;

      existingCart.totalAmount += quantityDifference * (book.price || 0);

      cartItem.quantity = quantity;
      await existingCart.save();

      book.quantity -= quantityDifference;

      if (book.quantity < 0) {
        throw new ApplicationError(httpStatus.BAD_REQUEST, "Invalid quantity");
      }

      if (quantity === 0) {
        const index = existingCart.items.findIndex((item) => {
          const bookIdInCart = (item.book as any)._id;
          return bookIdInCart?.toString() === bookId;
        });
        if (index !== -1) {
          existingCart.items.splice(index, 1);

          await BookModel.findByIdAndDelete(bookId);
        }
      }

      await book.save();
    } else {
      throw new ApplicationError(httpStatus.NOT_FOUND, "Cart item not found");
    }
  } catch (error: any) {
    console.error(error);
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const removeFromCart = async (
  userId: Types.ObjectId,
  bookId: string
): Promise<void> => {
  try {
    const existingCart = await CartModel.findOne({ user: userId }).populate(
      "items.book"
    );

    if (!existingCart) {
      throw new ApplicationError(httpStatus.NOT_FOUND, "Cart not found");
    }

    const cartItemIndex = existingCart.items.findIndex((item: CartItem) => {
      const bookIdInCart = (item.book as any)._id;

      if (bookIdInCart instanceof Types.ObjectId) {
        return bookIdInCart.toString() === bookId;
      } else {
        return bookIdInCart === bookId;
      }
    });

    if (cartItemIndex !== -1) {
      const removedCartItem = existingCart.items.splice(cartItemIndex, 1)[0];

      if (removedCartItem.book && (removedCartItem.book as any)._id) {
        existingCart.totalAmount -=
          removedCartItem.quantity * ((removedCartItem.book as any).price || 0);
      }

      await existingCart.save();

      const book = await BookModel.findById(
        (removedCartItem.book as any)._id || bookId
      );
      if (book) {
        book.quantity += removedCartItem.quantity;
        await book.save();
      }
    }
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getCartSummary = async (
  userId: Types.ObjectId
): Promise<Partial<Cart>> => {
  try {
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      throw new ApplicationError(httpStatus.NOT_FOUND, "Cart not found");
    }

    return {
      items: cart.items,
      totalAmount: cart.totalAmount,
      buyerName: cart.buyerName,
      contactNumber: cart.contactNumber,
      sellingDate: cart.sellingDate,
    };
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const CartServices = {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCartSummary,
};
