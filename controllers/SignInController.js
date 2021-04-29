const Users = require("../models/Users.js");
const u = Users

const SignInController = {
  getSignIn: (req, res) => {
    res.render("SignIn.ejs");
  },
  postSignIn: (req, res) => {
    u.signIn.findUser(req, res);
  },
};

module.exports = SignInController;
