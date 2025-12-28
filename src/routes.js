import { Router } from "express";
import  { productsRouter } from './modules/products/products.routes.js';

const router = Router();

router.use("/products", productsRouter);

export { router as APIRequestHandler };
