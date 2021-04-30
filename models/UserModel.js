const mongoose =require ("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cartItem' }]
  }
);
const User = mongoose.model('User', userSchema);

module.exports = User;

