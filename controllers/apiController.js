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
        console.log(Number(req.body.price).toLocaleString())
        await p.product.editProduct(req,productId);
        res.redirect("/admin/productList");
    },
    deleteProduct :async (req,res) => {
        const productId = req.body.id
        await p.product.deleteProduct(productId);
        res.send({message:"ok"})
    },
    searchProduct:async(req,res)=>{
        const kwd = req.query.search_key;
        const results = await p.product.searchProduct(kwd);
        res.render("searchResults.ejs",{results:results})
    },
    searchCategory:async(req,res)=>{
        const category = req.params.id;
        const results = await p.product.searchCategory(category);
        res.render("searchResults.ejs",{results:results})
    },
    searchBrand:async(req,res)=>{
        const brand = req.params.id;
        const results = await p.product.searchBrand(brand);
        res.render("searchResults.ejs",{results:results})
    },
    getMap:async(req,res)=>{
        res.send(process.env.GOOGLE_API_KEY || '');
    }
}

  