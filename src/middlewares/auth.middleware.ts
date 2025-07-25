import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserDoc } from "../models/user.model";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing access token" });

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET!);
    req.user = payload as UserDoc;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions = roles === "admin";
    if (!permissions)
      return res.status(403).json({ message: "Permission denied" });
    next();
  };
};
