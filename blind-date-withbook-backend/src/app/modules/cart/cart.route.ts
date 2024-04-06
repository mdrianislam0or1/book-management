import express from "express";
import { CartControllers } from "./cart.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/add",
  auth("user", "manager", "superAdmin"),
  CartControllers.addToCartController
);

router.put(
  "/update",
  auth("user", "manager", "superAdmin"),

  CartControllers.updateCartItemQuantityController
);

router.delete(
  "/remove/:bookId",
  auth("user", "manager", "superAdmin"),
  CartControllers.removeFromCartController
);

router.get(
  "/",
  auth("user", "manager", "superAdmin"),
  CartControllers.getCartSummaryController
);

export const CartRoutes = router;
