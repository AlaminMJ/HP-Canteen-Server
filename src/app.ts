import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware";
import authRoute from "./routes/auth";

dotenv.config({ path: ".env" });
const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(cookieParser());

app.get("/api/auth", authRoute);
app.get("/api/health", (req, res) => {
  res.json({ health: "Ok" });
});
app.get("/", (req, res) => {
  res.send("Canteen");
});

app.use(globalErrorHandler); // ⛑️ Global error handler last

export default app;
