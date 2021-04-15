import data from "../models/data.js";
import cartItem from "../models/cartItem.js";

export const getTop = (req, res) => {

  cartItem.find({}, (err, docs)=> {
    let cartData = {
        title: 'MongoDB cartItems' ,
        content: docs
    };
    res.render("Top.ejs", {
      data: {
        products: data.products,
        cartData: cartData,
      },
    });
  });

};
