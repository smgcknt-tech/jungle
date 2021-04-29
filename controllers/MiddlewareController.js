const Products = require("../models/Products.js");
const p = Products

module.exports = {
  loginCheck:async (req, res, next) => {
    if(req.session.userId === undefined){
      res.locals.isLoggedIn = false
      res.locals.userName = 'ゲスト'
      res.locals.cartItem = [];
    } else　{
      res.locals.cartItem  = await p.cart.findAll();
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

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

