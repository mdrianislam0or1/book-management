import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import ApplicationError from "../../errorHandler/ApplicationError";

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const user = new User({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role || "user",
  });

  return user.save();
};

const loginUserFromDB = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isPasswordMatched = await User.isPasswordMatched(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      throw new ApplicationError(
        httpStatus.UNAUTHORIZED,
        "Invalid login credentials"
      );
    }
    return user;
  } catch (error) {
    throw new ApplicationError(
      httpStatus.UNAUTHORIZED,
      "Invalid login credentials"
    );
  }
};

const getAllUsers = async (): Promise<TUser[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error retrieving users"
    );
  }
};

const updateUserDetails = async (
  userId: string,
  updatedData: Partial<TUser>
): Promise<TUser> => {
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, updatedData, {
      new: true,
    });
    if (!user) {
      throw new ApplicationError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error updating user details"
    );
  }
};

export const UserServices = {
  createUserIntoDB,
  loginUserFromDB,
  getAllUsers,
  updateUserDetails,
};
