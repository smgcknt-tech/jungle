
const cartItem =require ("../models/schema/cartItem.js");
const Products = require("../models/Products.js");
module.exports ={
  getCart: (req, res) =>{
    res.render("Cart.ejs", {
      data: {
        id: "",
        qty: "",
      },
    });
  },
  addCartItem: async (req, res) =>{
    const addedItemId = req.params.id;
    const qty = req.query.qty;
    const product = await Products.cart.getCartItem(addedItemId);
    await Products.cart.saveCartItem(product,qty);
    res.render("Cart.ejs", {
      data: {
        id: product._id,
        qty: qty,
      },
    });
  }
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
})
