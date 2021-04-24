const cartItem = require("./schemas/CartItem.js");
const Product = require("./schemas/ProductModel.js");

module.exports = {
  cart: {
    getCartItem: (ItemId) => {
      return new Promise((resolve) => {
        const product = Product.findById(ItemId);
        resolve(product);
      });
    },
    createItem: async (product, qty) => {
      const doesExit = await cartItem.exists({ productId: product._id });
      if (!doesExit) {
        cartItem.create({
          productId: product._id,
          name: product.name,
          price: product.price,
          qty: qty,
          countInStock:product.countInStock,
        });
      } else {
        cartItem.findOneAndUpdate(
          { productId: product._id },
          { $inc: { qty: qty } },
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    },
    deleteItem:async (ItemId) => {
      await cartItem.deleteOne({ productId: ItemId }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    },
  },
};
