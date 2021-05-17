
const Products = require("../models/Products.js");
const p = Products

module.exports = {
    getTop: async (req, res) => {
    const allProducts = await p.product.findAll();
    res.render("Top.ejs", {products:allProducts});
    }
}


  