const express =require ("express");
const apiController =require ("../controllers/apiController");
const router = express.Router();
router.get("/payment/paypal", apiController.paypal);

module.exports =  router
