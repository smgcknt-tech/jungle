

const data = require ("./schema/data.js");
const cartItem =require ("./schema/cartItem.js");


module.exports ={
    cart:{
        getCartItem:(addedItemId)=>{
            return new Promise ((resolve)=>{
                const product = data.products.find((product) => product._id === addedItemId);

                resolve(product)
            });
        },
        saveCartItem:(product,qty)=>{
            const addedItem = new cartItem({
                productId: product._id,
                name: product.name,
                price: product.price,
                qty: qty,
            });
            addedItem.save();
        },
    }

}
