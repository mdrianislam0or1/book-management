import { Schema, model, Model } from "mongoose";
import { Book } from "./book.interface";

const bookSchema = new Schema<Book>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    series: {
      type: String,
    },
    language: {
      type: String,
      required: true,
    },
    format: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const BookModel: Model<Book> = model<Book>("Book", bookSchema);

export default BookModel;
