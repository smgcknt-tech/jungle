const Users = require("../models/Users");
const u = Users;
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  checkOut: async (req, res) => {
    const id = Number(req.params.id);
    const userId = req.session.userId;
    const paypalId = process.env.PAY_PAL_CLIENT_ID
    const steps = [(step1 = ""), (step2 = ""), (step3 = ""), (step4 = "")];
    for (let i = 0; i < id; i++) {
      steps[i] = "active";
    }
    if (id === 3) {
      const postalCode = req.body.zip11;
      const adress = req.body.addr11;
      const doesExist = await u.checkOut.shippingDuplicationCheck(userId);
      if (doesExist) {
        await u.checkOut.updateShipping(postalCode, adress, userId);
      } else {
        await u.checkOut.newShipping(postalCode, adress, userId);
      }
    }
    if (id === 4) {
      const method = req.body.paymentMethod;
      const doesExist = await u.checkOut.methodDuplicationCheck(userId);
      if (doesExist) {
        await u.checkOut.updateMethod(method, userId);
      } else {
        await u.checkOut.newMethod(method, userId);
      }
    }
    res.render("CheckOut.ejs", { steps : steps, paypalId : paypalId });
  },
};

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
