import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
   max: 10,                 // pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});


// Fail fast if DB is down
// pool.on("connect", () => {
//   console.log("✅ PostgreSQL connected");
// });

// pool.on("error", (err) => {
//   console.error("❌ PG Pool error", err);
//   process.exit(1);
// });