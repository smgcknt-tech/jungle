const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    ordered_price: { type: Number, required: true },
    method: { type: String, required: true },
    payment: { type: String, required: true },
    ordered_products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true 
        },
        productQty: {
          type: Number, required: true 
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
