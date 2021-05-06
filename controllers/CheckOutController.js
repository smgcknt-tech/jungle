const Users = require("../models/Users");
const u = Users;

module.exports = {
  checkOut: async (req, res) => {
    const id = Number(req.params.id);
    const steps = [(step1 = ""), (step2 = ""), (step3 = ""), (step4 = "")];
    for (let i = 0; i < id; i++) {
      steps[i] = "active";
    }
    if (id === 3) {
      let userId = req.session.userId
      let postalCode = req.body.postalCode;
      let adress = req.body.adress;
      await u.checkOut.newShipping(postalCode, adress, userId);
    }
    res.render("CheckOut.ejs", { steps: steps });
  },
};

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
