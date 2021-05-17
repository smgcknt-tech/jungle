const Users = require("../models/Users");
const u = Users;
const bcryptjs = require("bcryptjs");

module.exports = {
    updateUserProfile :(req,res) => {
        password = req.body.password;
        bcryptjs.hash(password, 10,async(error, hash) => {
        await u.userProfile.update(req,hash)
        res.redirect("/");
        });

    },
}

//error-catcher
process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
  