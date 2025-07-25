"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
var zod_1 = require("zod");
var mongoose_1 = __importDefault(require("mongoose"));
var globalErrorHandler = function (err, req, res, _next) {
    console.error(err); // optional: log error stack
    var statusCode = 500;
    var message = "Internal Server Error";
    var errors = err;
    // 🔍 Zod validation error
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = "Validation error";
        errors = err.flatten().fieldErrors;
    }
    // 🧬 Mongoose validation error
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Mongoose validation error";
        errors = Object.values(err.errors).map(function (e) { return e.message; });
    }
    // 🧾 Duplicate key error (e.g., email already exists)
    else if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate key error";
        errors = err.keyValue;
    }
    // ❌ JWT Error
    else if (err.name === "JsonWebTokenError" ||
        err.name === "TokenExpiredError") {
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
        message: message,
        errors: errors,
    });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=error.middleware.js.map