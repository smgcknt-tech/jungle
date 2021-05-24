const Users = require("../models/Users.js");
const u = Users

module.exports = {
  getSignIn: (req, res) => {
    let errors=[];
    res.render("SignIn.ejs",{errors:errors});
  },
  postSignIn: (req, res) => {
    u.signIn.findUser(req, res);
  },
};



