import cartItem from "../models/cartItem.js";

export const dataPassing = async(req,res,next)=>{
    const cart = await cartItem.find({})
    .then(result => res.locals.cartItem = result)
    .catch(err => console.log(err))
    next();
  }