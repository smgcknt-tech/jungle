const express =require ("express");
const ProductController =require ("../controllers/ProductController.js");
const router = express.Router();
router.get('/:id',ProductController.getProduct,);

module.exports =  router