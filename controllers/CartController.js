const Product = require("../models/ProductModel");
const cartItem = require("../models/CartModel");

module.exports = {
  getCart: (req, res) => {
    res.render("Cart.ejs");
  },
  addCartItem: async (req, res) => {
    const ItemId = req.params.id;
    const qty = req.query.qty;
    if (qty > 0) {
      const product = await Product.findById(ItemId);
      const doesExit = await cartItem.exists({ productId: product._id });
      if (!doesExit) {
        cartItem.create({
          productId: product._id,
          name: product.name,
          price: product.price,
          qty: qty,
          countInStock: product.countInStock,
        });
      } else {
        cartItem.findOneAndUpdate(
          { productId: product._id },
          { $inc: { qty: qty } }
        );
      }
      res.redirect("/cart");
    } else {
      res.redirect("/product/" + ItemId);
    }
  },
  deleteCartItem: async (req, res) => {
    const ItemId = req.params.id;
    await cartItem.deleteOne({ productId: ItemId });
    res.redirect("/cart");
  },
};

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
