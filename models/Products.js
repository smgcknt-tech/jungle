

const data = require ("./schemas/Data.js");
const cartItem = require ("./schemas/CartItem.js");


module.exports ={
    cart:{
        getCartItem:(addedItemId)=>{
            return new Promise ((resolve)=>{
                const product = data.products.find((product) => product._id === addedItemId);

                resolve(product)
            });
        },
        saveCartItem:(product,qty)=>{
            //既存のカートアイテムが存在するかチェック
            //if
            const addedItem = new cartItem({
                productId: product._id,
                name: product.name,
                price: product.price,
                qty: qty,
            });
            addedItem.save();
            //else
            //既存のdocのqtyプロパティにqtyを加算
        },
    }

}
