import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./db.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, "../migrations");

export async function runMigrations() {
  // 1. Ensure migration history table exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      run_at TIMESTAMP DEFAULT now()
    );
  `);

  // 2. Get already-run migrations
  const { rows } = await pool.query("SELECT name FROM migrations");
  const executed = new Set(rows.map(r => r.name));

  // 3. Read migration files
  const files = fs.readdirSync(migrationsDir).sort();

  // 4. Run pending migrations
  for (const file of files) {
    if (executed.has(file)) continue;

    console.log(`Running migration: ${file}`);
    const sql = fs.readFileSync(
      path.join(migrationsDir, file),
      "utf-8"
    );

    await pool.query("BEGIN");
    try {
      await pool.query(sql);
      await pool.query(
        "INSERT INTO migrations (name) VALUES ($1)",
        [file]
      );
      await pool.query("COMMIT");
    } catch (err) {
      await pool.query("ROLLBACK");
      throw err;
    }
  }

  console.log("Migrations completed");
}
