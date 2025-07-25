import { Router } from "express";
import {
  login,
  refresh,
  logout,
  register,
  getProtectedData,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from "../schemas/auth.schema";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", logout);
router.get("/data/protected", authenticate, getProtectedData);
router.get("/me", (req, res) => {
  res.json({ req: "ok" });
});

export default router;
