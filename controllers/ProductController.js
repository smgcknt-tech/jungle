import data from "../models/data.js";

export const getProduct = (req, res) => {
    const product = data.products.find(product =>  product._id === req.params.id);
    try {
      res.render('Product.ejs',{product:product});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}