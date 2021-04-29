const Products = require("../models/Products.js");
const p = Products

const ProductController ={
  getProduct:async(req, res) => {
    const id = req.params.id
    const product = await p.product.findOne(id)
    res.render("Product.ejs", { product: product })
  },
}

module.exports =  ProductController;