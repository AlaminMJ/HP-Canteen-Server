"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
var zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.string().optional(), // Admin assigns later
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
});
exports.refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string(),
});
//# sourceMappingURL=auth.schema.js.map