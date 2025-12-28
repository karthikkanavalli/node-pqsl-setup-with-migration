import { Router } from "express";
import productsController from "./products.controller.js";

const router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.createProduct);
router.put("/:id", productsController.updateProductById);
router.delete("/:id", productsController.deleteProductById);


export { router as productsRouter };
