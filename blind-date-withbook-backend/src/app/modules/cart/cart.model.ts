import { model, Schema, Document, Types } from "mongoose";
import { Cart, CartItem } from "./cart.interface";

const cartItemSchema = new Schema<CartItem>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema<Cart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
    buyerName: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    sellingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CartModel = model<Cart>("Cart", cartSchema);

export default CartModel;
