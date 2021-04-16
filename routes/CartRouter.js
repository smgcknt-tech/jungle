import express from "express";
import { addCartItem } from "../controllers/AddedCartController.js";
import { getCart } from '../controllers/CartController.js';
const router = express.Router();
router.get('/',getCart,);
router.post('/:id',addCartItem,);

export default router