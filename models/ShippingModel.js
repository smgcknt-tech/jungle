const mongoose =require ("mongoose");

const ShippingSchema = mongoose.Schema({
    postalCode:String,
    adress:String,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},
{ timestamps: true }
);
const ShippingInfo = mongoose.model("ShippingInfo", ShippingSchema );
module.exports = ShippingInfo;
