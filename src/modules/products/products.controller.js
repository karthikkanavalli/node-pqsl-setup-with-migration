import { ProductService } from "./products.service.js";

const createProduct = async (req, res) => {
  const body = req.body;
  console.log(body);
  const user = await ProductService.createProduct(req.body);
  res.status(201).json({
    message: "Product created successfully",
    product: body,
  });
};

const getAllProducts = async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.status(200).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ product });
};
const updateProductById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (id) {
    const existingProduct = await ProductService.getById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
  } else {
    return res.status(400).json({ message: "Product ID is required" });
  }
  const updatedProduct = await ProductService.updateProduct(id, body);
  res
    .status(200)
    .json({ message: "Product updated successfully", product: updatedProduct });
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const existingProduct = await ProductService.getById(id);
  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  const data = await ProductService.deleteProduct(id);
  res.status(200).json({ message: "Product deleted successfully", product: data });
};
const ProductsController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
export default ProductsController;
