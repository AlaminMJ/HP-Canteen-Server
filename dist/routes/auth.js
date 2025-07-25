"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var validate_middleware_1 = require("../middlewares/validate.middleware");
var auth_schema_1 = require("../schemas/auth.schema");
var router = (0, express_1.Router)();
router.post("/login", (0, validate_middleware_1.validate)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post("/register", (0, validate_middleware_1.validate)(auth_schema_1.registerSchema), auth_controller_1.register);
router.post("/refresh", (0, validate_middleware_1.validate)(auth_schema_1.refreshSchema), auth_controller_1.refresh);
router.post("/logout", auth_controller_1.logout);
router.get("/data/protected", auth_middleware_1.authenticate, auth_controller_1.getProtectedData);
router.get("/me", function (req, res) {
    res.json({ req: "ok" });
});
exports.default = router;
//# sourceMappingURL=auth.js.map