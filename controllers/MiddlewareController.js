const cartItem =require("../models/schemas/CartItem.js");


module.exports = {
  dataPassing:async (req, res, next) => {
    const cart = await cartItem.find({})
      .then((result) => {res.locals.cartItem = result})
      .catch(err => console.log(err))
    next();
  },
  errorCatcher:(err, req, res, next) => {
    res.status(500).send({ message: err.message });
    next();
  }
}
