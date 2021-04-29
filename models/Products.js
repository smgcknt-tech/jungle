const Product = require("../models/ProductModel.js");
const cartItem =require("../models/CartModel.js");


module.exports = {
    product:{
        findOne:(id)=>{
            return Product.findById(id);
        },
        findAll:()=>{
            return Product.find({});
        }
    },
    cart:{
        findAll:() =>{
            return cartItem.find({})
        },
        findOne:() =>{
            
        }
    }


}