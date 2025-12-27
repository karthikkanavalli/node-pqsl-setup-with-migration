import { Products } from "./products.repository";

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
  }
};
