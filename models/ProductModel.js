const mongoose = require ("mongoose");

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
      image: { type: String, required: true },
      brand: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      countInStock: { type: Number, required: true },
      rating: { type: Number},
      numReviews: { type: Number},
      user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      order:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    },
    {
      timestamps: true,
    }
  );
  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;