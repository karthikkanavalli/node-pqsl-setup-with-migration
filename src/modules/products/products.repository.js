import pool from "../../db.js";

export const Products = {
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  },

  async create({ name, price, quantity, description }) {
    const { rows } = await pool.query(
      "INSERT INTO products (name, price ,quantity , description) VALUES ($1, $2,$3,$4) RETURNING *",
      [name, price , quantity, description]
    );
    return rows[0];
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM PRODUCTS WHERE id=$1`, [
      id,
    ]);
    return rows[0];
  },
};
