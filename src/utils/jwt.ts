import jwt from "jsonwebtoken";

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, process.env.ACCESS_SECRET!, { expiresIn: "15m" });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, process.env.REFRESH_SECRET!, { expiresIn: "7d" });

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret =
    type === "access"
      ? process.env.ACCESS_SECRET!
      : process.env.REFRESH_SECRET!;
  return jwt.verify(token, secret);
};
