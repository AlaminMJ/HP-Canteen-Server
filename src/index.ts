import dotenv from "dotenv";

import { connectDB, closeDB } from "./config/db";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(
      `[${new Date().toISOString()}] 🚀 Server running on port ${PORT}`
    );
  });

  const shutdown = async () => {
    console.log("\n🛑 Gracefully shutting down...");
    await closeDB();
    server.close(() => {
      console.log(`[${new Date().toISOString()}] 🔒 Server closed`);
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

startServer();
