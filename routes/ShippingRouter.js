const express =require ("express");
const ShippingController = require("../controllers/ShippingController");
const router = express.Router();
router.get('/:id',ShippingController.getShipping,);
module.exports =  router