"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProtectedData = exports.logout = exports.refresh = exports.register = exports.login = void 0;
var user_model_1 = __importDefault(require("../models/user.model"));
var jwt_1 = require("../utils/jwt");
var tokenBlacklist = new Set();
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, payload, accessToken, refreshToken;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                user = _c.sent();
                _b = !user;
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, user.comparePassword(password)];
            case 2:
                _b = !(_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid credentials" })];
                }
                payload = { id: user._id, email: user.email, role: user.role };
                accessToken = (0, jwt_1.signAccessToken)(payload);
                refreshToken = (0, jwt_1.signRefreshToken)(payload);
                res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, user: payload });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name_1, existingUser, newUser, payload, accessToken, refreshToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password, name_1 = _a.name;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(409).json({ message: "User already exists" })];
                }
                return [4 /*yield*/, user_model_1.default.create({
                        email: email,
                        password: password,
                        name: name_1,
                    })];
            case 2:
                newUser = _b.sent();
                payload = {
                    id: newUser._id,
                    email: newUser.email,
                    role: newUser.role,
                };
                accessToken = (0, jwt_1.signAccessToken)(payload);
                refreshToken = (0, jwt_1.signRefreshToken)(payload);
                res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken, user: payload });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Register error:", error_1);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var refresh = function (req, res) {
    var refreshToken = req.body.refreshToken;
    if (!refreshToken || tokenBlacklist.has(refreshToken)) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
    try {
        var payload = (0, jwt_1.verifyToken)(refreshToken, "refresh");
        var accessToken = (0, jwt_1.signAccessToken)(payload);
        res.json({ accessToken: accessToken });
    }
    catch (_a) {
        res.status(403).json({ message: "Invalid refresh token" });
    }
};
exports.refresh = refresh;
var logout = function (req, res) {
    var refreshToken = req.body.refreshToken;
    if (refreshToken)
        tokenBlacklist.add(refreshToken);
    res.sendStatus(204);
};
exports.logout = logout;
var getProtectedData = function (req, res) {
    var _a;
    res.json({ data: "Hello ".concat((_a = req.user) === null || _a === void 0 ? void 0 : _a.email, ", you accessed protected data!") });
};
exports.getProtectedData = getProtectedData;
//# sourceMappingURL=auth.controller.js.map