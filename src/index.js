import express from "express";
import morgan from "morgan";
import { pool } from "./db.js";
import { runMigrations } from "./migrate.js";
import { APIRequestHandler } from "./routes.js";

export const app = express();

const PORT = 3000;
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/",APIRequestHandler)


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
