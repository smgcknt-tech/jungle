const User = require("./UserModel");
const bcryptjs = require("bcryptjs");
const { ShippingInfo, paymentMethod } = require("./checkOutModel");

module.exports = {
  midlleware: {
    findUserdata: (userId) => {
      return User.findOne({ _id: userId })
        .populate("payment")
        .populate("order")
        .populate("product");
    },
  },
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
    newUser: async (userName, email, hash, admin) => {
      if(admin === "undefined"){
        admin = false;
      }else{
        admin = true
      }
      console.log(admin)
      const user = new User({
        isAdmin: admin,
        name: userName,
        email: email,
        password: hash,
      });
      await user.save();
      return user;
    },
  },
  checkOut: {
    newShipping: async (postalCode, adress, userId) => {
      const shipping = new ShippingInfo({
        postalCode: postalCode,
        adress: adress,
        user: userId,
      });
      await shipping.save();
      return shipping;
    },
    findShipping: (userId) => {
      return ShippingInfo.findOne({ user: userId });
    },
    shippingDuplicationCheck: (userId) => {
      return ShippingInfo.exists({ user: userId });
    },
    updateShipping: (postalCode, adress, userId) => {
      return ShippingInfo.findOneAndUpdate(
        { user: userId },
        {
          postalCode: postalCode,
          adress: adress,
        }
      );
    },
    newMethod: async (method, userId) => {
      const createdMethod = new paymentMethod({
        method: method,
        user: userId,
      });
      await createdMethod.save();
      await User.findOneAndUpdate(
        { _id: userId },
        { payment: createdMethod._id }
      );
      return createdMethod;
    },
    methodDuplicationCheck: async (userId) => {
      return paymentMethod.exists({ user: userId });
    },
    updateMethod: async (method, userId) => {
      return paymentMethod.findOneAndUpdate(
        { user: userId },
        { method: method }
      );
    },
  },
  userProfile: {
    update: (req,hash) => {
      return User.findOneAndUpdate(
        { _id: req.session.userId },
        {
          name: req.body.name,
          email: req.body.email,
          password: hash,
        }
      );
    },
  },
};

//error_catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
