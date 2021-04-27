const cartItem =require("../models/schemas/CartItem.js");


module.exports = {
  loginCheck:async (req, res, next) => {
    if(req.session.userId === undefined){
      res.locals.isLoggedIn = false
      res.locals.userName = 'ゲスト'
      res.locals.cartItem = ''
    } else　{
      const cart = await cartItem.find({})
      .then((result) => {res.locals.cartItem = result})
      .catch(err => console.log(err))
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
