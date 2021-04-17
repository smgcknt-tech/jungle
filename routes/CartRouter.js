const express = require ("express");
const CartController = require ('../controllers/CartController.js');
const router = express.Router();
router.get('/', CartController.getCart);
router.post('/:id', CartController.addCartItem);
module.exports = router