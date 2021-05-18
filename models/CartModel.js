const mongoose =require ("mongoose");

const cartItemSchema = mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    image: { type: String, required: true },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

const cartItem = mongoose.model("cartItem", cartItemSchema);

module.exports = cartItem;
