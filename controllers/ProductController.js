const Products = require("../models/Products.js");
const p = Products

module.exports = {
  getProduct:async(req, res) => {
    const id = req.params.id
    const product = await p.product.findOne(id)
    res.render("Product.ejs", { product: product })
  },
}


//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
