import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  _next
) => {
  console.error(err); // optional: log error stack

  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown = err;

  // 🔍 Zod validation error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errors = err.flatten().fieldErrors;
  }

  // 🧬 Mongoose validation error
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Mongoose validation error";
    errors = Object.values(err.errors).map((e) => e.message);
  }

  // 🧾 Duplicate key error (e.g., email already exists)
  else if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
    errors = err.keyValue;
  }

  // ❌ JWT Error
  else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Invalid or expired token";
  }

  // 🧼 Custom error shape
  else if (typeof err.statusCode === "number" && err.message) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
