import { Types } from "mongoose";

export interface Sale {
  product: Types.ObjectId;
  quantity: number;
  buyerName: string;
  saleDate: Date;
  buyerId: Types.ObjectId;
}
