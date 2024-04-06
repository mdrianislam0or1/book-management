import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { createUserValidation, loginUserValidation } from "./user.validation";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(createUserValidation),
  UserControllers.UserController
);

router.post(
  "/login",
  validateRequest(loginUserValidation),
  UserControllers.userLoginController
);

router.get("/all", auth("superAdmin"), UserControllers.getAllUsersController);

router.put(
  "/update/:userId",
  auth("superAdmin"),
  UserControllers.updateUserDetailsController
);

export const UserRouters = router;
