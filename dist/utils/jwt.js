"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signRefreshToken = exports.signAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var signAccessToken = function (payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "15m" });
};
exports.signAccessToken = signAccessToken;
var signRefreshToken = function (payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};
exports.signRefreshToken = signRefreshToken;
var verifyToken = function (token, type) {
    var secret = type === "access"
        ? process.env.ACCESS_SECRET
        : process.env.REFRESH_SECRET;
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map