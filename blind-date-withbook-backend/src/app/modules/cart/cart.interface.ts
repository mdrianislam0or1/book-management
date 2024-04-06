import { Document, Types } from "mongoose";
import { Book } from "../book/book.interface";

export interface CartItem {
  book: Types.ObjectId | string;
  quantity: number;
}

export interface Cart extends Document {
  user: Types.ObjectId;
  items: CartItem[];
  totalAmount: number;
  buyerName: string;
  contactNumber: string;
  sellingDate: Date;
}

export interface BookItem {
  bookId: string;
  quantity: number;
}

export interface AddToCartData {
  userId: Types.ObjectId;
  bookItems: { bookId: string; quantity: number }[];
  buyerName: string;
  contactNumber: string;
  sellingDate: Date;
}
