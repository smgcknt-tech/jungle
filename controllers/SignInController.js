const User = require("../models/UserModel.js");

const SignInController = {
  getSignIn: (req, res) => {
    res.render("SignIn.ejs");
  },
  postSignIn: async (req, res) => {
    //ユーザー認証 ※パスワードを直接比較している
    const email = req.body.email;
    await User.find({ email: email }, (err, results) => {
      if (results.length > 0) {
        if (req.body.password === results[0].password) {
            req.session.userName = results[0].name
            req.session.userId = results[0]._id
          res.redirect("/");
        } else {
          res.redirect("/signIn");
        }
      }
    });
  },
};

module.exports = SignInController;
