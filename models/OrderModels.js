const mongoose =require ("mongoose");

const orderSchema = new mongoose.Schema(
  {
    ordered_price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;