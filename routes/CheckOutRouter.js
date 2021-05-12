const express =require ("express");
const CheckOutController = require("../controllers/CheckOutController");
const c = CheckOutController
const router = express.Router();
router.post('/:id',c.checkOut,);
router.get('/orderConfirmation',c.orderConfirmation,);
router.get('/orderHistory',c.orderHistory,);
module.exports =  router

