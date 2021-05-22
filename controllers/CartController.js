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
        await p.cart.addQty(product._id, qty);
      } else {
        await p.cart.create(userId, product, qty);
      }
      res.redirect("/cart");
    } else {
      res.redirect("/product/" + id);
    }
  },
  deleteCartItem: async(req, res) => {
    const id = req.body.id;
    const userId = req.session.userId
    await p.cart.delete(id)
    const cartItem = await p.cart.findAll(userId)
    res.send(String(cartItem.length));
  },
  updateQty:async(req, res)=> {
    const id = req.body.id
    const qty = req.body.qty
    await p.cart.updateQty(id, qty)
    res.json(req.body);
  },
};


