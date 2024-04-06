import httpStatus from "http-status";
import SalesModel from "./sales.model";
import ApplicationError from "../../errorHandler/ApplicationError";
import BookModel from "../book/book.model";
import { Sale } from "./sales.interface";

const sellProduct = async (
  productId: string,
  quantity: number,
  buyerName: string,
  saleDate: Date,
  userRole: string,
  userId: string
): Promise<any> => {
  try {
    const product = await BookModel.findById(productId);
    if (!product) {
      throw new ApplicationError(httpStatus.NOT_FOUND, "Product not found");
    }

    if (quantity > product.quantity) {
      throw new ApplicationError(
        httpStatus.BAD_REQUEST,
        "Not enough stock available"
      );
    }

    const remainingQuantity = product.quantity - quantity;
    if (remainingQuantity === 0) {
      await BookModel.findByIdAndDelete(productId);
    } else {
      await BookModel.findByIdAndUpdate(productId, {
        $inc: { quantity: -quantity, sold: quantity },
      });
    }

    const sale = await SalesModel.create({
      product: productId,
      quantity,
      buyerName,
      saleDate,
      buyerId: userId,
      userRole,
      userId,
    });

    return sale;
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getWeeklySales = async (
  userId: string,
  userRole: string
): Promise<Sale[]> => {
  try {
    const query: any = {};

    if (userRole === "user") {
      query.buyerId = userId;
    }

    const weeklySales = await SalesModel.find(query);
    return weeklySales;
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getDailySales = async (
  userId: string,
  userRole: string
): Promise<Sale[]> => {
  try {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - 24);

    const query: any = { saleDate: { $gte: startDate } };

    if (userRole === "user") {
      query.buyerId = userId;
    }

    const dailySales = await SalesModel.find(query);
    return dailySales;
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getMonthlySales = async (
  userId: string,
  userRole: string
): Promise<Sale[]> => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const query: any = { saleDate: { $gte: startDate } };

    if (userRole === "user") {
      query.buyerId = userId;
    }

    const monthlySales = await SalesModel.find(query);
    return monthlySales;
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getYearlySales = async (
  userId: string,
  userRole: string
): Promise<Sale[]> => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    const query: any = { saleDate: { $gte: startDate } };

    if (userRole === "user") {
      query.buyerId = userId;
    }

    const yearlySales = await SalesModel.find(query);
    return yearlySales;
  } catch (error: any) {
    throw new ApplicationError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const SalesServices = {
  sellProduct,
  getWeeklySales,
  getDailySales,
  getMonthlySales,
  getYearlySales,
};
