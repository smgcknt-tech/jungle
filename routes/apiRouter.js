const express = require("express");

const apiController = require("../controllers/apiController");
const a = apiController;
const router = express.Router();

router.post("/update/userProfile", a.updateUserProfile);
router.post("/create/product", a.createProduct);
router.post("/edit/product/:id", a.editProduct);
router.post("/delete/product", a.deleteProduct);
router.post("/upload/image", a.uploadimage);
module.exports = router;
