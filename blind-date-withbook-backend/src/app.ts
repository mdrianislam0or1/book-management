import { Application } from "express";
import express, { Request, Response } from "express";
import cors from "cors";
import errorHandler from "./app/middleware/errorHandler";
import router from "./app/routers";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://blind-date-withbook.web.app",
    credentials: true,
  })
);

// Routes
app.use("/", router);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Blind Date with Book API!",
  });
});

// error handler
app.use(errorHandler);

export default app;
