const bcryptjs = require("bcryptjs");
const Users = require("../models/Users.js");
const u = Users
const Products = require("../models/Products.js");
const p = Products;

module.exports = {
  getSignUp: (req, res) => {
    res.render("SignUp.ejs", { 
      errors: [],
      id:"",
      qty:0,
      url:""       
    });
  },
  getSignUpWithCart: (req, res) => {
    const id = req.params.id
    const qty = req.query.qty
    const url = "/signUp/" + id +"?qty="+ qty;
    res.render("SignUp.ejs", { 
      errors: [],
      id:id,
      qty:qty,
      url:url 
    });
  },
  duplicationCheck: async (req, res, next) => {
    const email = req.body.email;
    const errors = [];
    await u.signUp.userExists(email)
      .then((doesExist) => {
        if (doesExist) {
          errors.push("メールアドレスはすでに使用されています");
          res.render("SignUp.ejs", { errors: errors });
        } else {
          next();
        }
      });
  },
  emptyCheck: (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];
    if (userName === "") {
      errors.push("ユーザー名が空です");
    }
    if (email === "") {
      errors.push("メールアドレスが空です");
    }
    if (password === "") {
      errors.push("パスワードが空です");
    }
    if (errors.length > 0) {
      res.render("SignUp.ejs", { errors: errors });
    } else {
      next();
    }
  },
  postSignUp:(req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    let admin = req.body.admin;
    bcryptjs.hash(password, 10, async(error, hash) => {
      await u.signUp.newUser(userName, email, hash,admin)
        .then((user) => {
          req.session.userId = user._id;
          req.session.userName = userName;
          res.redirect("/");
        });
    });
  },
  postSignUpWithCart:(req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const id = req.params.id
    const qty = req.query.qty
    let admin = req.body.admin;
    bcryptjs.hash(password, 10, async(error, hash) => {
      await u.signUp.newUser(userName, email, hash,admin)
        .then(async(user) => {
          req.session.userId = user._id;
          const userId = req.session.userId;
          req.session.userName = userName;
          if (qty > 0) {
            const product = await p.product.findOne(id);
            const doesExist = await p.cart.duplicationCheck(product._id);
            if (doesExist) {
              await p.cart.addQty(product._id, qty);
            } else {
              await p.cart.create(userId, product, qty);
            }
            res.redirect("/cart");
          } else {
            res.redirect(`/product/${id}`);
          }
        });
    });
  }
};

