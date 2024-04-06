import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { decodeToken } from "../../utils/hashOrDecodePW";
import { Types } from "mongoose";
import { Request, Response } from "express";
import { User } from "./user.model";

const UserController = catchAsync(async (req, res) => {
  try {
    const userData: TUser = req.body;
    const user = await UserServices.createUserIntoDB(userData);

    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: responseData,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

const userLoginController = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserServices.loginUserFromDB(email, password);

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      config.jwt_secret as string,
      {
        expiresIn: config.jwt_secret_IN,
      }
    );

    console.log(decodeToken(token, config.jwt_secret as string));
    const responseData = {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successful",
      data: responseData,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const users = await UserServices.getAllUsers();
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
);

const updateUserDetailsController = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const updatedData = req.body;
      const updatedUser = await UserServices.updateUserDetails(
        userId,
        updatedData
      );
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User details updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
);

export const UserControllers = {
  UserController,
  userLoginController,
  getAllUsersController,
  updateUserDetailsController,
};
