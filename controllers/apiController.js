module.exports = {
    paypal: async (req, res) => {
    res.send(process.env.PAY_PAL_CLIENT_ID||'sb')
    }
}

//error-catcher
process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
  