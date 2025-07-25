"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var error_middleware_1 = require("./middlewares/error.middleware");
var auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config({ path: ".env" });
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_1.default);
app.get("/api/health", function (req, res) {
    res.json({ health: "Ok" });
});
app.get("/", function (req, res) {
    res.send("Canteen");
});
app.use(error_middleware_1.globalErrorHandler); // ⛑️ Global error handler last
exports.default = app;
//# sourceMappingURL=app.js.map