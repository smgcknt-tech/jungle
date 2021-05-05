const mongoose =require ("mongoose");

const ShippingSchema = mongoose.Schema({
    postalCode: String,
    adress: String,
});

const ShippingInfo = mongoose.model("ShippingInfo", ShippingSchema );

module.exports = ShippingInfo;
