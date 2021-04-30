const express = require ("express");
const CartController = require ('../controllers/CartController');
const router = express.Router();
router.get('/', CartController.getCart);
router.post('/:id', CartController.addCartItem);
router.post('/delete/:id',CartController.deleteCartItem);
router.post('/updateQty',CartController.updateQty);
module.exports = router