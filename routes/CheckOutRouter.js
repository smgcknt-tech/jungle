const express =require ("express");
const CheckOutController = require("../controllers/CheckOutController");
const c = CheckOutController
const router = express.Router();
router.post('/:id',c.checkOut,);
router.get('/orderConfirmation',c.orderConfirmation,);
router.post('/create/order',c.createOrder,);
router.get('/orderHistory',c.orderHistory,);
router.get('/thanks',c.thanks,);
module.exports =  router

