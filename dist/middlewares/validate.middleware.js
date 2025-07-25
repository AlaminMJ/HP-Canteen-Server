"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var validate = function (schema) { return function (req, res, next) {
    var result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
    }
    req.body = result.data;
    next();
}; };
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map