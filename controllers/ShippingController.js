module.exports = {
  getShipping: (req, res) => {
    let n = req.params.id;
    let steps = [ one= "", two= "", three= "", four= "" ];
    for (let i = 0; i < n; i++) {
      steps[i] = "active";
      
    }
    console.log( steps)
    res.render("Shipping.ejs", { steps: steps });
  },
};

//error-catcher
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
