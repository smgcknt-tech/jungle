const { users } = require("../models/schemas/Data.js");
const User = require("../models/schemas/UserModels.js");

const SignInController = {
  getSignIn: (req, res) => {
    res.render("SignIn.ejs");
  },
  postSignIn: (req, res) => {
    //ユーザー認証
    const email = req.body.email;
    const password = req.body.password;
    User.find({ email: email }, (err, results) => {
      if (results.length > 0) {
        if (password === results[0].password) {
          console.log("認証成功");
          res.redirect("/");
        } else {
          console.log("認証失敗");
          res.redirect("/signIn");
        }
      }
    });
  },
};

module.exports = SignInController;
