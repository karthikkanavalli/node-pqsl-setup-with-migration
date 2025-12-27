import express from "express";
import morgan from "morgan";
import { pool } from "./db.js";
import { runMigrations } from "./migrate.js";

export const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(morgan("dev"));

const start = async () => {
  try {
    await pool.query("select 1"); // DB check
      await runMigrations();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
};

start();
