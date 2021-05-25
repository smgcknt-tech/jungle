const express =require ("express");
const ProductController =require ("../controllers/ProductController");
const router = express.Router();
router.get('/:id',ProductController.getProduct);
router.get('/review/:id',ProductController.getReview);
router.post('/review/:id',ProductController.postReview);

module.exports =  router