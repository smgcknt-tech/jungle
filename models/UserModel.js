const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  shipping:{type: mongoose.Schema.Types.ObjectId, ref: 'ShippingInfo'},
  payment:{type: mongoose.Schema.Types.ObjectId, ref: 'paymentMethod'},
  order:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
  product: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
});
const User = mongoose.model("User", userSchema);

module.exports = User;
