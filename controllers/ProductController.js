const Product = require("../models/schemas/ProductModel.js");


const ProductController ={
  getProduct: async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id);
    res.render("Product.ejs", { product: product });
  },
}

module.exports =  ProductController;