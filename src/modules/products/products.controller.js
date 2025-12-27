import { Products } from "./products.repository";

const createProduct = async (req, res) => {
  const body = req.body;
  const user = await ProductService.createUser(req.body);
  res.status(201).json({
    message: "Product created successfully",
    product: body,
  });
};

const getAllProducts = async (req, res) => {
  const products = await Products.getAll();
  res.status(200).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Products.getById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ product });
};

export default ProductsController = {
  createProduct,
  getAllProducts,
  getProductById,
};
