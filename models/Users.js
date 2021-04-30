const User = require("./UserModel");
const bcryptjs = require("bcryptjs");

module.exports = {
  signIn: {
    findUser: async (req, res) => {
      const email = req.body.email;
      await User.find({ email: email }, (err, results) => {
        if (results.length > 0) {
          const plain = req.body.password;
          const hash = results[0].password;
          bcryptjs.compare(plain, hash, (error, isEqual) => {
            if (isEqual) {
              req.session.userName = results[0].name;
              req.session.userId = results[0]._id;
              res.redirect("/");
            } else {
              res.redirect("/signIn");
            }
          });
        }
      });
    },
  },
  signUp: {
    userExists: (email) => {
      return User.exists({ email: email });
    },
    newUser: async (userName, email, hash) => {
      const user = new User({
        isAdmin: false,
        name: userName,
        email: email,
        password: hash,
      });
      await user.save();
      return user;
    },
  },
};

//error_catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
