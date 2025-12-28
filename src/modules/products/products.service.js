import { Products } from "./products.repository.js";

export const ProductService = {
  async createProduct(data) {
    const product = await Products.create(data);
    return product;
  },

  async getAllProducts() {
    const products = await Products.getAll();
    return products;
  },

  async getById(id) {
    return await Products.getById(id);
  },

  async updateProduct(id, data) {
    return await Products.update(id, data);
  },

  async deleteProduct(id) {
    return await Products.deleteProduct(id);
  }
};
