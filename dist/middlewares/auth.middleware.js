"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authenticate = function (req, res, next) {
    var authHeader = req.headers.authorization;
    var token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Missing access token" });
    try {
        var payload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET);
        req.user = payload;
        next();
    }
    catch (_a) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authenticate = authenticate;
var authorize = function (roles) {
    return function (req, res, next) {
        var permissions = roles === "admin";
        if (!permissions)
            return res.status(403).json({ message: "Permission denied" });
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map