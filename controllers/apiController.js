const multer =require ("multer");
const Users = require("../models/Users");
const u = Users;
const bcryptjs = require("bcryptjs");
const Products = require("../models/Products.js");
const p = Products;

module.exports = {
    updateUserProfile :(req,res) => {
        password = req.body.password;
        bcryptjs.hash(password, 10,async(error, hash) => {
        await u.userProfile.update(req,hash)
        res.redirect("/");
        });

    },
    createProduct :async (req,res) => {
        const userId = req.session.userId
        await p.product.create(req,userId);
        res.redirect("/admin/productList");
    },
    editProduct :async (req,res) => {
        const productId = req.params.id
        await p.product.editProduct(req,productId);
        res.redirect("/admin/productList");
    },
    deleteProduct :async (req,res) => {
        const productId = req.body.id
        await p.product.deleteProduct(productId);
        res.send({message:"ok"})
    },
    uploadimage:(req,res) => {
        const storage = multer.diskStorage({
            destination(req, file, cb) {
              cb(null, 'uploads/');
            },
            filename(req, file, cb) {
              cb(null, `${Date.now()}.jpg`);
            },
        });
        const upload = multer({ storage });
        res.send(`/${req.file.path}`);



    }
}

//error-catcher
process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
  