import express from "express";
import morgan from "morgan";

import productRouter from "./routes/productRoutes";
import errorHandler from "./utils/errorHandler";
import AppError from "./utils/AppError";
import logger from "./utils/logger";

const app = express();

// Morgan logs -> Winston
const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Morgan format
const morganFormat =
  process.env.MORGAN_MODE === "tiny" ? "tiny" : "dev";

app.use(
  morgan(morganFormat, {
    stream: morganStream,
  })
);

// Parse JSON request body
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Robust Error Logging API is running",
  });
});

// Product routes
app.use("/api/v1/products", productRouter);

// Catch-all unknown route - 404
app.use((req, res, next) => {
  next(
    new AppError(
      `Route ${req.originalUrl} not found`,
      404
    )
  );
});

// Centralized error handler
app.use(errorHandler);

export default app;