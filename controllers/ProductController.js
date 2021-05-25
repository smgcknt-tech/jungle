const Products = require("../models/Products.js");
const p = Products;

module.exports = {
  getProduct: async (req, res) => {
    const id = req.params.id;
    const product = await p.product.findOne(id);
    const reviews = await p.review.findReviews(id);
    res.render("Product.ejs", {
      product: product,
      reviews: reviews,
    });
  },
  getReview: async (req, res) => {
    const id = req.params.id;
    const product = await p.product.findOne(id);
    res.render("review.ejs", { product: product });
  },
  postReview: async (req, res) => {
    const userId = req.session.userId;
    await p.review.createReview(req, userId);
    res.redirect("/product/" + req.params.id);
  },
};
