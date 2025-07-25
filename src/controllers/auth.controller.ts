import { Request, Response } from "express";
import User from "../models/user.model";
import { signAccessToken, signRefreshToken, verifyToken } from "../utils/jwt";

const tokenBlacklist = new Set<string>();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = { id: user._id, email: user.email, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.status(200).json({ accessToken, refreshToken, user: payload });
};

export const refresh = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken || tokenBlacklist.has(refreshToken)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const payload = verifyToken(refreshToken, "refresh");
    const accessToken = signAccessToken(payload as object);
    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const logout = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (refreshToken) tokenBlacklist.add(refreshToken);
  res.sendStatus(204);
};

export const getProtectedData = (req: Request, res: Response) => {
  res.json({ data: `Hello ${req.user?.email}, you accessed protected data!` });
};
