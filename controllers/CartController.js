const Products = require("../models/Products.js");
const p = Products;

module.exports = {
  getCart: (req, res) => {
    res.render("Cart.ejs");
  },
  addCartItem: async (req, res) => {
    const userId = req.session.userId
    const id = req.params.id;
    const qty = req.query.qty;
    if (qty > 0) {
      const product = await p.product.findOne(id);
      const doesExist = await p.cart.duplicationCheck(product._id);
      if (doesExist) {
        await p.cart.update(product._id, qty);
      } else {
        await p.cart.create(userId, product, qty);
      }
      res.redirect("/cart");
    } else {
      res.redirect("/product/" + id);
    }
  },
  deleteCartItem: async (req, res) => {
    const id = req.params.id;
    await p.cart.delete(id);
    res.redirect("/cart");
  },
};

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
