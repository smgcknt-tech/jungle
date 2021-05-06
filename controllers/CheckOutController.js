const Users = require("../models/Users");
const u = Users;

module.exports = {
  checkOut: async (req, res) => {
    const id = Number(req.params.id);
    const userId = req.session.userId
    const postalCode = req.body.zip11;
    const adress = req.body.addr11;
    const steps = [(step1 = ""), (step2 = ""), (step3 = ""), (step4 = "")];
    for (let i = 0; i < id; i++) {
      steps[i] = "active";
    }
    if (id === 3) {
      const doesExist = await u.checkOut.shippingDuplicationCheck(userId);
      if(doesExist){
        await u.checkOut.updateShipping(postalCode, adress, userId);
      }else {
        await u.checkOut.newShipping(postalCode, adress, userId);
      }    
    }
    res.render("CheckOut.ejs", { steps: steps });
  },
};

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
