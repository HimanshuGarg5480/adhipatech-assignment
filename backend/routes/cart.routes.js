import { Router } from "express";
import { addItemInCart, deleteItemFromCart, fetchAllCartItems } from "../controllers/cartController.js";
const router = Router();

router.route("/").get(fetchAllCartItems);
router.route("/add").post(addItemInCart);
router.route("/remove/:id").delete(deleteItemFromCart);


export default router;