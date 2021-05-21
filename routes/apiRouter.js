const express = require("express");
const multer =require ("multer");
const apiController = require("../controllers/apiController");
const a = apiController;
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});
const upload = multer({ storage })

router.post("/update/userProfile", a.updateUserProfile);
router.post("/create/product", a.createProduct);
router.post("/edit/product/:id", a.editProduct);
router.get("/search/product", a.searchProduct);
router.get("/search/category/:id", a.searchCategory)
router.post("/delete/product", a.deleteProduct);
router.post("/upload/image",upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;
