import express from "express";
import { SalesControllers } from "./sales.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/sell",
  auth("manager", "superAdmin", "user"),
  SalesControllers.sellProductController
);

router.get("/history/weekly", auth(), SalesControllers.getWeeklySales);

router.get("/history/daily", auth(), SalesControllers.getDailySales);

router.get("/history/monthly", auth(), SalesControllers.getMonthlySales);

router.get("/history/yearly", auth(), SalesControllers.getYearlySales);

export const SalesRouters = router;
