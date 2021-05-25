const Product = require("../models/ProductModel");
const cartItem = require("../models/CartModel");
const Order = require("./OrderModels");
const User = require("./UserModel");
const Review = require("./ReviewModel");

module.exports = {
  product: {
    findOne: (id) => {
      return Product.findById(id);
    },
    findAll: () => {
      return Product.find({});
    },
    findCategory: async () => {
      const products = await Product.find({});
      const arr = products.map((product) => {
        return product.category;
      });
      const categories = await Array.from(new Set(arr));
      return categories;
    },
    findBrand: async () => {
      const products = await Product.find({});
      const arr = products.map((product) => {
        return product.brand;
      });
      const brands = await Array.from(new Set(arr));
      return brands;
    },
    searchProduct: (kwd) => {
      return Product.find({ name: { $regex: kwd, $options: "i" } });
    },
    searchCategory: (category) => {
      return Product.find({ category: category });
    },
    searchBrand: (brand) => {
      return Product.find({ brand: brand });
    },
    create: async (req, userId) => {
      const createdProduct = await new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        image: req.body.image,
        description: req.body.description,
        rating: 0,
        numReviews: 0,
        user: userId,
      });
      await createdProduct.save();
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { product: createdProduct._id } }
      );
      return createdProduct;
    },
    editProduct: (req, productId) => {
      return Product.findOneAndUpdate(
        { _id: productId },
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
    deleteProduct: (productId) => {
      return Product.deleteOne({ _id: productId });
    },
  },
  cart: {
    findAll: (userId) => {
      return cartItem.find({ user: userId });
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
        image: product.image,
        user: userId,
      });
    },
    delete: (id) => {
      return cartItem.deleteOne({ productId: id });
    },
    deleteAllCart: (id) => {
      return cartItem.deleteMany({ user: id });
    },
    updateQty: (id, qty) => {
      return cartItem.findOneAndUpdate({ productId: id }, { qty: qty });
    },
  },
  order: {
    createOrder: async (req, userId) => {
      const createdOrder = new Order({
        ordered_price: req.body.ordered_price,
        method: req.body.method,
        payment: req.body.payment,
        ordered_products: req.body.ordered_products,
        user: userId,
      });
      await createdOrder.save();
      createdOrder.ordered_products.forEach(async(x)=>{
          await Product.findOneAndUpdate(
              { _id: x.productId},
              {$inc: {countInStock:-x.productQty }}
          );
      }) 
      
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { order: createdOrder._id } }
      );
      return createdOrder;
    },
  },
  review: {
    createReview: async (req, userId) => {
      const createdReview = new Review({
        is_posted_by: userId,
        reviewed_product: req.params.id,
        public_name: req.body.public_name,
        review: req.body.review,
        title: req.body.title,
        comment: req.body.comment,
      });
      await createdReview.save();
      const productReviews = await Review.find({
        reviewed_product: req.params.id,
      }).select("review");
      let sum = 0;
      for (let i = 0; i < productReviews.length; i++) {
        sum = sum + productReviews[i].review;
      }
      const avg = sum / productReviews.length;
      await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          rating: avg,
          numReviews: productReviews.length,
        }
      );
      return createdReview;
    },
    findReviews: (id) => {
      return Review.find({ reviewed_product: id });
    },
  },
};
