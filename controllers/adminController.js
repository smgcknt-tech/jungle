const Products = require("../models/Products.js");
const p = Products

module.exports = {
    getProductList : async (req, res) => {
        const allProducts = await p.product.findAll();
        res.render("ProductList.ejs", {products:allProducts});
    },
    getEditProduct : async (req, res) => {
        const id = req.params.id;
        const Product = await p.product.findOne(id);
        res.render("ProductEdit.ejs", {editingProduct:Product});
    },
    getRegisterProduct : (req, res) => {
        res.render("ProductRegister.ejs",);
    },
    getdashBoard: (req, res) => {
        res.render("dashBord.ejs",);
    },
}

