const data =require ("../models/schemas/Data.js");
const Product = require("../models/schemas/ProductModel.js");

const ProductController ={
  getProduct: (req, res) => {
    const product = data.products.find(
      (product) => product._id === req.params.id
    );
    res.render("Product.ejs", { product: product });
  },
  seedProduct:(req, res) => {
    const createdProducts = Product.create({
      name: 'aaa Shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 1200,
      countInStock: 3,
      brand: 'Nike',
      rating: 0.8,
      numReviews: 10,
      description: 'high quality product',
    });
    res.send({ createdProducts });
  }
}

module.exports =  ProductController;