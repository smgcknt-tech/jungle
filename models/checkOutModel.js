const mongoose =require ("mongoose");

const ShippingSchema = mongoose.Schema({
    postalCode:String,
    adress:String,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    payment:{type: mongoose.Schema.Types.ObjectId, ref: 'paymentMethod'},
},
{ timestamps: true }
);
const ShippingInfo = mongoose.model("ShippingInfo", ShippingSchema );

//------------------------------------------------------------------

const paymentMethodSchema = mongoose.Schema({
    method:String,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    shipping:{type: mongoose.Schema.Types.ObjectId, ref: 'ShippingInfo'},
},
{ timestamps: true }
);
const paymentMethod = mongoose.model("paymentMethod", paymentMethodSchema );

//------------------------------------------------------------------

module.exports = {
    ShippingInfo,
    paymentMethod,
}