const express = require("express");
const apiController = require("../controllers/apiController");
const a = apiController;
const router = express.Router();



router.post("/update/userProfile", a.updateUserProfile);
router.post("/create/product", a.createProduct);
router.post("/edit/product/:id", a.editProduct);
router.get("/search/product", a.searchProduct);
router.get("/search/category/:id", a.searchCategory)
router.get("/search/brand/:id", a.searchBrand)
router.post("/delete/product", a.deleteProduct);
router.get("/google/map", a.getMap);


module.exports = router;
