

const data = require ("./schema/data.js");
const cartItem =require ("./schema/cartItem.js");


module.exports ={
    getCartItem:()=>{ data.products.find((product) => product._id === addedItemId)},
}
