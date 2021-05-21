const Product = require("../models/ProductModel");
const cartItem = require("../models/CartModel");
const Order = require("./OrderModels");
const User = require("./UserModel");


module.exports = {
  product: {
    findOne: (id) => {
      return Product.findById(id);
    },
    findAll: () => {
      return Product.find({});
    },
    findCategory:async() => {
      const products = await Product.find({});
      const arr = products.map((product)=>{
        return product.category
      })
      const categories = await Array.from(new Set(arr));
      return categories
    },
    searchProduct: (kwd) => {
      return Product.find({ name: { $regex: kwd, $options: "i" }});
    },
    searchCategory:(category)=> {
      return Product.find({category:category});
    },
    create: async(req,userId) => {
      const createdProduct = await new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        image: req.body.image,
        description: req.body.description,
        rating:0,
        numReviews:0,
        user:userId,  
      });
      await createdProduct.save();
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { product: createdProduct._id } },
      );
      return createdProduct;
    },
    editProduct: (req,productId) => {
      return Product.findOneAndUpdate(
        { _id : productId},
        {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        image: req.body.image,
        description: req.body.description,
        }
      );
    },
    deleteProduct:(productId)=>{
      return Product.deleteOne({_id : productId})
    },
  },
  cart: {
    findAll: (userId) => {
      return cartItem.find({user:userId});
    },
    duplicationCheck: (id) => {
      return cartItem.exists({ productId: id });
    },
    addQty: (id, qty) => {
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
    updateQty: (id, qty) => {
      return cartItem.findOneAndUpdate(
        { productId: id },
        { qty: qty }
      );
    },
  },
  order:{
    createOrder: async (ordered_price,userId)=>{
      const createdOrder = new Order({
        ordered_price : ordered_price,
        user: userId
      });
      await createdOrder.save();
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { order: createdOrder._id } },
      );
      return createdOrder;



    },
  },
};
