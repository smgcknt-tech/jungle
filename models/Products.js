const Product = require("../models/ProductModel");
const cartItem = require("../models/CartModel");

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
    findAll: (userId) => {
      return cartItem.find({user:userId});
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
    create: (userId, product, qty) => {
      return cartItem.create({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: qty,
        countInStock: product.countInStock,
        image:product.image,
        user:userId
      });
    },
    delete:(id)=>{
      return cartItem.deleteOne({ productId: id })
    },
    updateQty:(qty,id)=>{
      return cartItem.findOneAndUpdate(
        { productId: id },
        { $inc: { qty: qty } }
      );
    },
  },
};
