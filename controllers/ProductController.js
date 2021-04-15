import data from "../models/data.js";
import cartItem from "../models/cartItem.js";


export const getProduct = (req, res) => {
  const product = data.products.find(
    (product) => product._id === req.params.id
  );
  cartItem.find({}, (err, docs)=> {
    let cartData = {
        title: 'MongoDB cartItems' ,
        content: docs
    };
    res.render("Product.ejs", {
      data: {
        product: product,
        cartData: cartData,
      },
    });
  });
};

