import { Router } from "express";
import productsController from "./products.controller";

const router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.createProduct);

export { router as productsRouter };
