const cartItem =require("../models/CartModel.js");


module.exports = {
  loginCheck:async (req, res, next) => {
    if(req.session.userId === undefined){
      res.locals.isLoggedIn = false
      res.locals.userName = 'ゲスト'
      res.locals.cartItem = ''
    } else　{
      const itemIncart = await cartItem.find({})
      .then((r) => {res.locals.cartItem = r})
      res.locals.isLoggedIn = true
      res.locals.userName = req.session.userName
    }
    next();
  },
  errorCatcher:(err, req, res, next) => {
    res.status(500).send({ message: err.message });
    next();
  }
}
