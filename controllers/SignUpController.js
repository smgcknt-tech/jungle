const bcryptjs = require("bcryptjs");
const Users = require("../models/Users.js");
const u = Users

module.exports = {
  getSignUp: (req, res) => {
    res.render("SignUp.ejs", { errors: [] });
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
    bcryptjs.hash(password, 10, async(error, hash) => {
      await u.signUp.newUser(userName, email, hash)
        .then((user) => {
          req.session.userId = user._id;
          req.session.userName = userName;
          res.redirect("/");
        });
    });
  },
};

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

