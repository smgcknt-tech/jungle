
const Products = require("../models/Products.js");

module.exports ={
  getCart: (req, res) =>{
    res.render("Cart.ejs");
  },
  addCartItem: async (req, res) =>{
    const ItemId = req.params.id;
    const qty = req.query.qty;
    if(qty > 0) {
      const product = await Products.cart.getCartItem(ItemId);
      await Products.cart.createItem(product,qty);
      res.redirect("/cart");
    } else {
      res.redirect('/product/'+ ItemId )
    }
  },
  deleteCartItem: async(req,res)=>{
    const ItemId = req.params.id;
    await Products.cart.deleteItem(ItemId);
    res.redirect("/cart");
  }
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
})
