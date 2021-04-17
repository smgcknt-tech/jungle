const data =require ("../models/schema/data.js");

const ProductController ={
  getProduct: (req, res) => {
    const product = data.products.find(
      (product) => product._id === req.params.id
    );
    res.render("Product.ejs", { product: product });
  }
}

module.exports =  ProductController;