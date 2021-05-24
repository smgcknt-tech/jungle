const User = require("./UserModel");
const bcryptjs = require("bcryptjs");
const { ShippingInfo, paymentMethod } = require("./checkOutModel");

module.exports = {
  midlleware: {
    findUserdata: (userId) => {
      return User.findOne({ _id: userId })
        .populate("payment")
        .populate("product")
        .populate("order")
    },
  },
  signIn: {
    findUser: async (req, res) => {
      const email = req.body.email;
      let errors =[];
      await User.find({ email: email }, (err, results) => {
        if (results.length > 0) {
          const plain = req.body.password;
          const hash = results[0].password;
          const isAdmin = results[0].isAdmin;
          bcryptjs.compare(plain, hash, (error, isEqual) => {
            if (isEqual) {
              req.session.userName = results[0].name;
              req.session.userId = results[0]._id;
              if(isAdmin){
                req.session.isAdmin = true;
              } else{
                req.session.isAdmin = false;
              }
              res.redirect("/");
            } else {
              errors.push("パスワードが違います");
              res.render("signIn.ejs",{errors:errors});
            }
          });
        } else {
          errors.push("メールアドレスが違います")
          res.render("signIn.ejs",{errors:errors});
        }
      });
    },
  },
  signUp: {
    userExists: (email) => {
      return User.exists({ email: email });
    },
    newUser: async (userName, email, hash, admin) => {
      if(admin === undefined){
        admin = false;
      }else{
        admin = true
      }
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

