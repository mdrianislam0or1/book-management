import { Schema, model, Model, Types } from "mongoose";
import { Sale } from "./sales.interface";

const salesSchema = new Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    buyerName: {
      type: String,
      required: true,
    },
    saleDate: {
      type: Date,
      required: true,
    },
    buyerId: {
      type: String,
      required: false,
    },
    userRole: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const SalesModel: Model<Sale> = model<Sale>("Sale", salesSchema);

export default SalesModel;
