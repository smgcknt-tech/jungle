const data = require("./schemas/Data.js");
const cartItem = require("./schemas/CartItem.js");

module.exports = {
  cart: {
    getCartItem: (ItemId) => {
      return new Promise((resolve) => {
        const product = data.products.find((product) => product._id === ItemId);
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
