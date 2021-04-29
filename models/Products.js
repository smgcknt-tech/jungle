const Product = require("../models/ProductModel.js");
const cartItem = require("../models/CartModel.js");

module.exports = {
  product: {
    findOne: (id) => {
      return Product.findById(id);
    },
    findAll: () => {
      return Product.find({});
    },
  },
  cart: {
    findAll: () => {
      return cartItem.find({});
    },
    duplicationCheck: (id) => {
      return cartItem.exists({ productId: id });
    },
    update: (id, qty) => {
      return cartItem.findOneAndUpdate(
        { productId: id },
        { $inc: { qty: qty } }
      );
    },
    create: (product,qty) => {
      return cartItem.create({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: qty,
        countInStock: product.countInStock,
      });
    },
    delete:(id)=>{
      return cartItem.deleteOne({ productId: id })
    }
  },
};
