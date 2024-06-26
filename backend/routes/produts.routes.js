import { Router } from "express";
import { fetchAllProducts, fetchProductById } from "../controllers/productController.js";
const router = Router();

router.route("/").get(fetchAllProducts);
router.route("/:id").get(fetchProductById);


export default router;