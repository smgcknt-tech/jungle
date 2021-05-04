const express = require ("express");
const CartController = require ('../controllers/CartController');
const c = CartController;
const router = express.Router();
router.get('/', c.getCart);
router.post('/create/:id', c.addCartItem);
router.post('/delete', c.deleteCartItem);
router.post('/update/qty', c.updateQty);
module.exports = router