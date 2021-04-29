module.exports = {
  getCheckOut: (req, res) => {
    let n = req.params.id;
    let steps = [ step1= "", step2= "", step3= "", step4= "" ];
    for (let i = 0; i < n; i++) {
      steps[i] = "active";
    }
    res.render("CheckOut.ejs", { steps: steps });
  },
};

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
