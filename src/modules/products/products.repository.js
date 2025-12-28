import { pool } from "../../db.js";

export const Products = {
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  },

  async create({ name, price, quantity, description }) {
    const { rows } = await pool.query(
      "INSERT INTO products (name, price ,quantity , description) VALUES ($1, $2,$3,$4) RETURNING *",
      [name, price, quantity, description]
    );
    return rows[0];
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM PRODUCTS WHERE id=$1`, [
      id,
    ]);
    return rows[0];
  },

  async update(id, data) {
    const { name, price, quantity, description } = data;
    const { rows } = await pool.query(
      `UPDATE products SET name=$1, price=$2, quantity=$3, description=$4 WHERE id=$5 RETURNING *`,
      [name, price, quantity, description, id]
    );
    return rows[0];
  },

  async deleteProduct(id) {
    const { rows } = await pool.query(
      `DELETE FROM products WHERE id=$1 RETURNING *`,
      [id]
    );
    return rows[0];
  },
};
