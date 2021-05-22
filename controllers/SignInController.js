const Users = require("../models/Users.js");
const u = Users

module.exports = {
  getSignIn: (req, res) => {
    res.render("SignIn.ejs");
  },
  postSignIn: (req, res) => {
    u.signIn.findUser(req, res);
  },
};



