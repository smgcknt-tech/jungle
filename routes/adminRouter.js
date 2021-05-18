const express =require ("express");
const adminController =require ("../controllers/adminController");
const router = express.Router();
router.get("/productList", adminController.getProductList);
router.get("/editProduct/:id", adminController.getEditProduct);
router.get("/RegisterProduct", adminController.getRegisterProduct);
module.exports =  router
