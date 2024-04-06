import { Request, Response } from "express";
import httpStatus from "http-status";
import { SalesServices } from "./sales.service";
import sendResponse from "../../utils/sendResponse";

const sellProductController = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, buyerName, saleDate } = req.body;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    const sale = await SalesServices.sellProduct(
      productId,
      quantity,
      buyerName,
      saleDate,
      userRole,
      userId
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Product sold successfully",
      data: sale,
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

const getWeeklySales = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const userRole = req.user?.role;

    const weeklySales = await SalesServices.getWeeklySales(userId, userRole);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Weekly sales retrieved successfully",
      data: weeklySales,
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

const getDailySales = async (req: Request, res: Response) => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?._id;
    const dailySales = await SalesServices.getDailySales(userId, userRole);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Daily sales retrieved successfully",
      data: dailySales,
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

const getMonthlySales = async (req: Request, res: Response) => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?._id;
    const monthlySales = await SalesServices.getMonthlySales(userId, userRole);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Monthly sales retrieved successfully",
      data: monthlySales,
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

const getYearlySales = async (req: Request, res: Response) => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?._id;
    const yearlySales = await SalesServices.getYearlySales(userId, userRole);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Yearly sales retrieved successfully",
      data: yearlySales,
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

export const SalesControllers = {
  sellProductController,
  getWeeklySales,
  getDailySales,
  getMonthlySales,
  getYearlySales,
};
