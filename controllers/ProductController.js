import data from "../models/data.js";

export const getProduct = (req, res) => {
  const product = data.products.find(
    (product) => product._id === req.params.id
  );
  res.render("Product.ejs", { product: product });
};
