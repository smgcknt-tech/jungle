const express =require ("express");
const multer =require ("multer");
const UploadController = require ("../controllers/UploadController");
const u = UploadController
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
  router.post("/image",upload.single('image'),u.uploadImage);



module.exports =  router
