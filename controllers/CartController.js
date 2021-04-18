
const cartItem =require ("../models/schemas/CartItem.js");
const Products = require("../models/Products.js");
module.exports ={
  getCart: (req, res) =>{
    res.render("Cart.ejs", {
      product:'',
      qty:'',
    });
  },
  addCartItem: async (req, res) =>{
    const addedItemId = req.params.id;
    const qty = req.query.qty;
    if(qty > 0) {
      const product = await Products.cart.getCartItem(addedItemId);
      await Products.cart.saveCartItem(product,qty);
      res.render("Cart.ejs", {
        product:product,
        qty:qty
      });
    } else {
      res.redirect('/product/'+ addedItemId )
    }
  }
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
})
