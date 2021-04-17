
const data = require ("../models/schema/data.js");
const cartItem =require ("../models/schema/cartItem.js");

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
    const qty = req.query.qty;
    const addedItemId = req.params.id;
    const product = data.products.find((product) => product._id === addedItemId);
    const addedItem = new cartItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      qty: qty,
    });
    const savedItem = await addedItem.save();
    res.render("Cart.ejs", {
      data: {
        id: product._id,
        qty: qty,
      },
    });
  }
}
